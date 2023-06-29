import { Response, NextFunction } from 'express';

import { TypedRequest, UserRequest } from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import itemService from '../services/Item.service.js';

import fieldService from '../services/Field.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
    NewCollectionResponse,
} from '../types/collections.type.js';

import { IItemModel } from '../types/items.types.js';

import { HttpStatusCodes } from '../configs/httpResponce.config.js';

import { FieldWithValueType } from '../types/fields.type.js';

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private findUserCollections: (
            UserId: number
        ) => Promise<ICollectionModel[]>,
        private findCollectionItems: (
            collectionId: number
        ) => Promise<IItemModel[]>,
        private findItemFields: (
            item: IItemModel
        ) => Promise<FieldWithValueType[]>
    ) {}

    private handleCollectionCreate = async (
        payload: CollectionCredentialsType
    ): Promise<NewCollectionResponse> => {
        const collection = await this.createCollection(payload);
        const fields = await Promise.all(
            payload.fields.map((field) => collection.createField(field))
        );
        return { collection, fields };
    };

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<NewCollectionResponse>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionCreate({
                ...req.body,
                userId: req.userId as number,
            });
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    private getCollectionItems = async (collection: ICollectionModel) => {
        const items = await this.findCollectionItems(collection.id);
        return await Promise.all(
            items.map(async (item) => {
                const fields = await this.findItemFields(item);
                return { item, fields };
            })
        );
    };

    private getCollectionsWithItems = (collections: Array<ICollectionModel>) =>
        Promise.all(
            collections.map(async (collection) => {
                const items = await this.getCollectionItems(collection);
                return { collection, items };
            })
        );

    public handleUserCollections = async (
        req: UserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collectionsList = await this.findUserCollections(
                req.userId as number
            );
            const collectionsWithItems = await this.getCollectionsWithItems(
                collectionsList
            );
            res.send(collectionsWithItems);
        } catch (err) {
            next(err);
        }
    };
}

const collectionsController = new CollectionsController(
    collectionService.createCollection,
    collectionService.findUserCollections,
    itemService.findCollectionItems,
    fieldService.findItemFields
);

export default collectionsController;
