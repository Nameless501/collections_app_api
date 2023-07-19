import { Response, NextFunction, Request } from 'express';

import { ResponseWithMessage, TypedRequest, UserRequest } from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import itemService from '../services/Item.service.js';

import fieldService from '../services/Field.service.js';

import cloudStorageService from '../services/CloudStorage.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

import { FieldCredentialsType } from '../types/fields.type.js';

import { IItemModel } from '../types/items.types.js';

import { HttpStatusCodes, HttpMessages } from '../configs/httpResponse.config.js';

import { FieldWithValueType } from '../types/fields.type.js';

import { CollectionScopes } from '../configs/enums.config.js';

import { ScopeType } from '../types/common.types.js';

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private updateCollection: (
            payload: Partial<CollectionCredentialsType>,
            id: number
        ) => Promise<void>,
        private deleteCollection: (
            id: number[]
        ) => Promise<void>,
        private findUserCollections: (
            UserId: number,
            scopes?: ScopeType<CollectionScopes>
        ) => Promise<ICollectionModel[]>,
        private findCollectionById: (
            id: number,
            scopes?: ScopeType<CollectionScopes>
        ) => Promise<ICollectionModel>,
        private findAllCollections: (
            scopes?: ScopeType<CollectionScopes>
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
        return collectionWithImage;
    };

    private handleCollectionImageUpdate = ({
        file,
        params
    }: TypedRequest<CollectionCredentialsType>) => {
        if(file) {
            return this.uploadCollectionImage(file, Number(params.collectionId));
        }
    };

    private handleCollectionUpdate = async (req: TypedRequest<CollectionCredentialsType>) => {
        const image = await this.handleCollectionImageUpdate(req);
        await this.updateCollection({ ...req.body, image }, Number(req.params.collectionId));
        return await this.findCollectionById(
            Number(req.params.collectionId),
            [CollectionScopes.withFields, CollectionScopes.withUser]
        );
    };

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionCreate(req);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleUpdateCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionUpdate(req);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleNewCollectionFields = async (
        req: TypedRequest<{fields: FieldCredentialsType[]}>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.findCollectionById(Number(req.params.collectionId));
            const fields = await this.createCollectionFields(req.body.fields, collection);
            res.status(HttpStatusCodes.dataCreated).send(fields);
        } catch (err) {
            next(err);
        }
    };

    public handleCollectionsTop = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findAllCollections([CollectionScopes.withItems, CollectionScopes.withUser]);
            collections.sort((a, b) => (b.items as IItemModel[]).length - (a.items as IItemModel[]).length);
            res.status(HttpStatusCodes.dataCreated).send(collections.slice(0, 5));
        } catch (err) {
            next(err);
        }
    };

    public handleCollectionData = async (
        req: Request,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.findCollectionById(
                Number(req.params.collectionId),
                [CollectionScopes.withFields, CollectionScopes.withUser]
            );
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleUserCollections = async (
        req: UserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collectionsList = await this.findUserCollections(Number(req.params.userId), [CollectionScopes.withUser]);
            res.send(collectionsList);
        } catch (err) {
            next(err);
        }
    };

    public handleAllCollections = async (
        req: UserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collectionsList = await this.findAllCollections([CollectionScopes.withUser]);
            res.send(collectionsList);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteCollections = async (
        req: TypedRequest<{ id: number[] }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteCollection(req.body.id);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };
}

export default new CollectionsController(
    collectionService.createCollection,
    collectionService.updateCollection,
    collectionService.deleteCollection,
    collectionService.findUserCollections,
    collectionService.findCollectionById,
    collectionService.findAllCollections,
    itemService.findCollectionItems,
    fieldService.findItemFields,
    cloudStorageService.uploadCollectionImage
);
