import { ModelCtor } from 'sequelize';

import CollectionModel from '../models/collection.model.js';

import FieldModel from '../models/field.model.js';

import {
    ICollectionModel,
    CollectionCredentialsType,
} from '../types/collections.type.js';

import { IFieldModel } from '../types/fields.type.js';

class CollectionService {
    constructor(
        private collectionModel: ModelCtor<ICollectionModel>,
        private fieldModel: ModelCtor<IFieldModel>
    ) {}

    public createCollection = (
        payload: CollectionCredentialsType
    ): Promise<ICollectionModel> =>
        this.collectionModel.create(payload, { include: this.fieldModel });

    private findCollections = (
        param?: Partial<CollectionCredentialsType>
    ): Promise<ICollectionModel[]> =>
        this.collectionModel.findAll(
            param
                ? { where: param, include: this.fieldModel }
                : { include: this.fieldModel }
        );

    public findUserCollections = (
        userId: number
    ): Promise<ICollectionModel[]> => this.findCollections({ userId });

    public findAllCollections = (): Promise<ICollectionModel[]> =>
        this.findCollections();
}

const collectionService = new CollectionService(CollectionModel, FieldModel);

export default collectionService;
