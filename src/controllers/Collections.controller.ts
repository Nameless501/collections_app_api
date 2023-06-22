import { Request, Response, NextFunction } from 'express';

import collectionService from '../services/Collection.service.js';

import { ICollectionModel } from '../models/collection.model.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

import CollectionSubjects from '../configs/subjects.config.js';

type CollectionCredentialsType = {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: string;
};

class CollectionsController {
    constructor(
        private createCollection: (
            payload: CollectionCredentialsType
        ) => Promise<ICollectionModel>,
        private findUserCollections: (
            UserId: number
        ) => Promise<ICollectionModel[]>
    ) {}

    private handleCollectionCreate = ({
        title,
        subject,
        description,
        image,
    }: CollectionCredentialsType): Promise<ICollectionModel> =>
        this.createCollection({ title, subject, description, image });

    public handleNewCollection = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.handleCollectionCreate(req.body);
            res.status(HttpStatusCodes.dataCreated).send(collection);
        } catch (err) {
            next(err);
        }
    };

    public handleUserCollections = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findUserCollections(req.body.UserId);
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
