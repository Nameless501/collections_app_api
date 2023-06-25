import { Response, NextFunction } from 'express';

import { TypedRequest, UserRequest } from '../types/common.types.js';

import collectionService from '../services/Collection.service.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private findUserCollections: (
            UserId: number
        ) => Promise<ICollectionModel[]>
    ) {}

    private handleCollectionCreate = (
        payload: CollectionCredentialsType
    ): Promise<ICollectionModel> => this.createCollection(payload);

    public handleNewCollection = async (
        req: TypedRequest<CollectionCredentialsType>,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionCreate({
                ...req.body,
                UserId: req.UserId as number,
            });
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleUserCollections = async (
        req: UserRequest,
        res: Response<ICollectionModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findUserCollections(
                req.UserId as number
            );
            res.send(collections);
        } catch (err) {
            next(err);
        }
    };
}

const collectionsController = new CollectionsController(
    collectionService.createCollection,
    collectionService.findUserCollections
);

export default collectionsController;
