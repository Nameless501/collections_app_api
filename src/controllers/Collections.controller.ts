import { Response, NextFunction, Request } from 'express';

import {
    ResponseWithMessage,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import cloudStorageService from '../services/CloudStorage.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

import { FieldCredentialsType, IFieldModel } from '../types/fields.type.js';

import { IItemModel } from '../types/items.types.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

import { CollectionScopes } from '../configs/enums.config.js';

import { ScopeType } from '../types/common.types.js';
import { checkEditRights } from '../utils/helpers.util.js';

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private updateCollection: (
            payload: Partial<CollectionCredentialsType>,
            id: number
        ) => Promise<void>,
        private deleteCollection: (id: number) => Promise<void>,
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

    private findCollectionUser = async (
        collection: ICollectionModel
    ): Promise<void> => {
        const user = await collection.getUser();
        collection.setDataValue('user', user);
    };

    private handleCollectionCreate = async ({
        body,
        file,
        params,
    }: UserRequest) => {
        const collection = await this.createCollection({
            ...body,
            userId: Number(params.userId),
        });
        await this.findCollectionUser(collection);
        const collectionWithImage = await this.handleCollectionImage(
            file,
            collection
        );
        return collectionWithImage;
    };

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            checkEditRights(req, Number(req.params.userId));
            const collection = await this.handleCollectionCreate(req);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    private createCollectionFields = (
        fieldsList: Array<FieldCredentialsType>,
        collection: ICollectionModel
    ): Promise<IFieldModel[]> =>
        Promise.all(fieldsList.map((field) => collection.createField(field)));

    public handleNewCollectionFields = async (
        req: TypedRequest<{ fields: FieldCredentialsType[] }>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.findCollectionById(
                Number(req.params.collectionId)
            );
            checkEditRights(req, Number(collection.userId));
            const fields = await this.createCollectionFields(
                req.body.fields,
                collection
            );
            res.status(HttpStatusCodes.dataCreated).send(fields);
        } catch (err) {
            next(err);
        }
    };

    private handleCollectionImageUpdate = ({
        file,
        params,
    }: TypedRequest<CollectionCredentialsType>) => {
        if (file) {
            return this.uploadCollectionImage(
                file,
                Number(params.collectionId)
            );
        }
    };

    private checkCollectionEditRights = async (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        const { userId } = await this.findCollectionById(
            Number(req.params.collectionId)
        );
        checkEditRights(req, userId);
    };

    private handleCollectionUpdate = async (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        const image = await this.handleCollectionImageUpdate(req);
        await this.updateCollection(
            { ...req.body, image },
            Number(req.params.collectionId)
        );
        return await this.findCollectionById(Number(req.params.collectionId), [
            CollectionScopes.withFields,
            CollectionScopes.withUser,
        ]);
    };

    public handleUpdateCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkCollectionEditRights(req);
            const collection = await this.handleCollectionUpdate(req);
            res.send(collection);
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
            const collections = await this.findAllCollections([
                CollectionScopes.withItems,
                CollectionScopes.withUser,
            ]);
            collections.sort(
                (a, b) =>
                    (b.items as IItemModel[]).length -
                    (a.items as IItemModel[]).length
            );
            res.send(collections.slice(0, 5));
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
            res.send(collection);
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
            const collectionsList = await this.findUserCollections(
                Number(req.params.userId),
                [CollectionScopes.withUser]
            );
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
            const collectionsList = await this.findAllCollections([
                CollectionScopes.withUser,
            ]);
            res.send(collectionsList);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteCollection = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkCollectionEditRights(req);
            await this.deleteCollection(Number(req.params.collectionId));
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
    cloudStorageService.uploadCollectionImage
);
