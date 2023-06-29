import { ModelCtor } from 'sequelize';

import CollectionModel from '../models/collection.model.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

class CollectionService {
    constructor(private collectionModel: ModelCtor<ICollectionModel>) {}

    public createCollection = (
        payload: CollectionCredentialsType
    ): Promise<ICollectionModel> => this.collectionModel.create(payload);

    private findCollections = (
        param?: Partial<CollectionCredentialsType>
    ): Promise<ICollectionModel[]> =>
        this.collectionModel.findAll({ where: param });

    public findUserCollections = (
        userId: number
    ): Promise<ICollectionModel[]> => this.findCollections({ userId });
}

const collectionService = new CollectionService(CollectionModel);

export default collectionService;
