import { Request, Response, NextFunction } from 'express';

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
        req: Request,
        res: Response<ICollectionModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const params = { ...req.body, UserId: Number(req.headers.UserId) };
            const collection = await this.handleCollectionCreate(params);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleUserCollections = async (
        req: Request,
        res: Response<ICollectionModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findUserCollections(
                Number(req.headers.UserId)
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
