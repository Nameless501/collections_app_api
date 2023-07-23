import { Response, NextFunction, Request } from 'express';

import {
    ResponseWithMessage,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import cloudStorageService from '../services/CloudStorage.service.js';

import searchService from '../services/Search.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
    CreateCollection,
    UpdateCollection,
    DeleteCollection,
    FindUserCollections,
    FindCollectionById,
    FindAllCollections,
} from '../types/collections.types.js';

import { UploadCollectionImage } from '../types/cloudStorage.types.js';

import { Index } from '../types/search.types.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

import { CollectionScopes, SearchIndexes } from '../configs/enums.config.js';

import { checkEditRights } from '../utils/helpers.util.js';

class CollectionsController {
    constructor(
        private create: CreateCollection,
        private updateCollection: UpdateCollection,
        private deleteCollection: DeleteCollection,
        private findUserCollections: FindUserCollections,
        private findCollectionById: FindCollectionById,
        private findAllCollections: FindAllCollections,
        private uploadImage: UploadCollectionImage,
        private index: Index
    ) {}

    private getReqIdParam = (req: Request): number =>
        Number(req.params.collectionId);

    private createCollectionImage = async (
        file: Express.Multer.File | undefined,
        collection: ICollectionModel
    ) => {
        if (file) {
            const image = await this.uploadImage(file, collection.id);
            await this.updateCollection({ image }, collection.id);
            collection.image = image;
        }
    };

    private getCollectionUser = async (
        collection: ICollectionModel
    ): Promise<void> => {
        const user = await collection.getUser();
        collection.setDataValue('user', user);
    };

    private createCollection = (
        req: TypedRequest<CollectionCredentialsType>
    ): Promise<ICollectionModel> =>
        this.create({
            ...req.body,
            userId: Number(req.params.userId),
        });

    private handleCollectionCreate = async (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        const collection = await this.createCollection(req);
        await this.getCollectionUser(collection);
        await this.createCollectionImage(req.file, collection);
        return collection;
    };

    private indexCollection = (collection: ICollectionModel) =>
        this.index(SearchIndexes.collections, collection.id, {
            title: collection.title,
            subject: collection.subject,
            description: collection.description,
        });

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            checkEditRights(req, Number(req.params.userId));
            const collection = await this.handleCollectionCreate(req);
            await this.indexCollection(collection);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    private handleCollectionImageUpdate = (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        if (req.file) {
            return this.uploadImage(req.file, this.getReqIdParam(req));
        }
    };

    private checkCollectionEditRights = async (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        const { userId } = await this.findCollectionById(
            this.getReqIdParam(req)
        );
        checkEditRights(req, userId);
    };

    private updateCollectionData = async (
        req: TypedRequest<CollectionCredentialsType>
    ) => {
        const image = await this.handleCollectionImageUpdate(req);
        await this.updateCollection(
            { ...req.body, image },
            this.getReqIdParam(req)
        );
        return await this.findCollectionById(this.getReqIdParam(req), [
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
            const collection = await this.updateCollectionData(req);
            res.send(collection);
        } catch (err) {
            next(err);
        }
    };

    private sorCollectionsBySize = (collections: ICollectionModel[]): void => {
        collections.sort((a, b) => {
            if (Array.isArray(a.items) && Array.isArray(b.items)) {
                return b.items.length - a.items.length;
            }
            return 0;
        });
    };

    public handleGetBiggestCollections = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findAllCollections([
                CollectionScopes.withItems,
                CollectionScopes.withUser,
            ]);
            this.sorCollectionsBySize(collections);
            res.send(collections.slice(0, 5));
        } catch (err) {
            next(err);
        }
    };

    public handleGetCollectionData = async (
        req: Request,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.findCollectionById(
                this.getReqIdParam(req),
                [CollectionScopes.withFields, CollectionScopes.withUser]
            );
            res.send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleGetUserCollections = async (
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

    public handleGetAllCollections = async (
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
            await this.deleteCollection(Number(this.getReqIdParam(req)));
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
    cloudStorageService.uploadCollectionImage,
    searchService.index
);
