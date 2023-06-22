import { ModelCtor } from 'sequelize';

import CollectionModel, {
    ICollectionModel,
} from '../models/collection.model.js';

import CollectionSubjects from '../configs/subjects.config.js';

class CollectionService {
    constructor(private model: ModelCtor<ICollectionModel>) {}

    public createCollection = async (payload: {
        title: string;
        subject: CollectionSubjects;
        description: string;
        image?: string;
    }): Promise<ICollectionModel> => this.model.create(payload);

    private findCollections = (param?: {
        [key: string]: number | string;
    }): Promise<ICollectionModel[]> =>
        this.model.findAll(param ? { where: param } : {});

    public findUserCollections = (
        UserId: number
    ): Promise<ICollectionModel[]> => this.findCollections({ UserId });

    public findAllCollections = (): Promise<ICollectionModel[]> =>
        this.findCollections();
}

const collectionService = new CollectionService(CollectionModel);

export default collectionService;
