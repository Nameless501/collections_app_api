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
    UserId: number;
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
        UserId
    }: CollectionCredentialsType): Promise<ICollectionModel> =>
        this.createCollection({ title, subject, description, image, UserId });

    public handleNewCollection = async (
        req: Request,
        res: Response,
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
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collections = await this.findUserCollections(Number(req.headers.UserId));
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
