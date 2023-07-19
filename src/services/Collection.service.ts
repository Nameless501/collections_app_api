import { ModelCtor } from 'sequelize';

import CollectionModel from '../models/collection.model.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

import { ScopeType } from '../types/common.types.js';

import { CollectionScopes } from '../configs/enums.config.js';

class CollectionService {
    constructor(private collectionModel: ModelCtor<ICollectionModel>) {}

    public createCollection = (
        payload: CollectionCredentialsType
    ): Promise<ICollectionModel> => this.collectionModel.create(payload);

    private findCollections = (
        param?: Partial<CollectionCredentialsType>,
        scopes?: ScopeType<CollectionScopes>
    ): Promise<ICollectionModel[]> =>
        this.collectionModel.scope(scopes).findAll({ where: param });

    public findUserCollections = (
        userId: number,
        scopes?: ScopeType<CollectionScopes>
    ): Promise<ICollectionModel[]> => this.findCollections({ userId }, scopes);

    public updateCollection = async (
        payload: Partial<CollectionCredentialsType>,
        id: number
    ): Promise<void> => {
        await this.collectionModel.update(payload, { where: { id } });
    };

    public findAllCollections = (scopes?: ScopeType<CollectionScopes>): Promise<ICollectionModel[]> =>
        this.findCollections(undefined, scopes);

    public deleteCollection = async (id: number[]): Promise<void> => {
        await this.collectionModel.destroy({ where: { id } });
    }

    public findCollectionById = async (id: number, scopes?: ScopeType<CollectionScopes>): Promise<ICollectionModel> => {
        const collections = await this.findCollections({ id }, scopes);
        return collections[0];
    }
}

export default new CollectionService(CollectionModel);
