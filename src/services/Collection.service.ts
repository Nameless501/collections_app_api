import { ModelCtor } from 'sequelize';

import CollectionModel from '../models/collection.model.js';

import {
    ICollectionModel,
    CreateCollection,
    FindCollections,
    FindUserCollections,
    UpdateCollection,
    FindCollectionById,
    FindAllCollections,
    DeleteCollection,
} from '../types/collections.types.js';

class CollectionService {
    constructor(private collectionModel: ModelCtor<ICollectionModel>) {}

    public createCollection: CreateCollection = (payload) =>
        this.collectionModel.create(payload);

    private findCollections: FindCollections = (param, scopes) =>
        this.collectionModel.scope(scopes).findAll({ where: param });

    public findUserCollections: FindUserCollections = (userId, scopes?) =>
        this.findCollections({ userId }, scopes);

    public findCollectionById: FindCollectionById = async (id, scopes) => {
        const [collection] = await this.findCollections({ id }, scopes);
        return collection;
    };

    public findAllCollections: FindAllCollections = (scopes) =>
        this.findCollections(undefined, scopes);

    public updateCollection: UpdateCollection = async (payload, id) => {
        await this.collectionModel.update(payload, { where: { id } });
    };

    public deleteCollection: DeleteCollection = async (id) => {
        await this.collectionModel.destroy({ where: { id } });
    };
}

export default new CollectionService(CollectionModel);
