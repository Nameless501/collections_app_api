import { ModelCtor } from 'sequelize';

import CollectionModel from '../models/collection.model.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

class CollectionService {
    constructor(private model: ModelCtor<ICollectionModel>) {}

    public createCollection = (
        payload: CollectionCredentialsType
    ): Promise<ICollectionModel> => this.model.create(payload);

    private findCollections = (
        param?: Partial<CollectionCredentialsType>
    ): Promise<ICollectionModel[]> =>
        this.model.findAll(param ? { where: param } : {});

    public findUserCollections = (
        UserId: number
    ): Promise<ICollectionModel[]> => this.findCollections({ UserId });

    public findAllCollections = (): Promise<ICollectionModel[]> =>
        this.findCollections();
}

const collectionService = new CollectionService(CollectionModel);

export default collectionService;
