import { Response, NextFunction } from 'express';

import { TypedRequest, UserRequest } from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import itemService from '../services/Item.service.js';

import fieldService from '../services/Field.service.js';

import cloudStorageService from '../services/CloudStorage.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
    NewCollectionResponse,
} from '../types/collections.type.js';

import { FieldCredentialsType } from '../types/fields.type.js';

import { IItemModel } from '../types/items.types.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

import { FieldWithValueType } from '../types/fields.type.js';

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private updateCollection: (
            payload: Partial<CollectionCredentialsType>,
            id: number
        ) => Promise<void>,
        private findUserCollections: (
            UserId: number
        ) => Promise<ICollectionModel[]>,
        private findCollectionItems: (
            collectionId: number
        ) => Promise<IItemModel[]>,
        private findItemFields: (
            item: IItemModel
        ) => Promise<FieldWithValueType[]>,
        private uploadCollectionImage: (
            file: Express.Multer.File,
            collectionId: number
        ) => Promise<string>
    ) {}

    private handleCollectionImage = async (
        file: Express.Multer.File | undefined,
        collection: ICollectionModel
    ) => {
        if (file) {
            const image = await this.uploadCollectionImage(file, collection.id);
            await this.updateCollection({ image }, collection.id);
            collection.image = image;
        }
        return collection;
    };

    private createCollectionFields = (
        fieldsList: Array<FieldCredentialsType>,
        collection: ICollectionModel
    ) => Promise.all(fieldsList.map((field) => collection.createField(field)));

    private handleCollectionCreate = async ({
        body,
        file,
        userId,
    }: UserRequest) => {
        const collection = await this.createCollection({ ...body, userId });
        const collectionWithImage = await this.handleCollectionImage(
            file,
            collection
        );
        const fields = await this.createCollectionFields(
            JSON.parse(body.fields),
            collection
        );
        return { collection: collectionWithImage, fields };
    };

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<NewCollectionResponse>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionCreate(req);
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

export default new CollectionsController(
    collectionService.createCollection,
    collectionService.updateCollection,
    collectionService.findUserCollections,
    itemService.findCollectionItems,
    fieldService.findItemFields,
    cloudStorageService.uploadCollectionImage
);
