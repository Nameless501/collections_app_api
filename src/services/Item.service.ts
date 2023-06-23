import { ModelCtor } from 'sequelize';

import ItemModel, { IItemModel } from '../models/item.model.js';

class CollectionService {
    constructor(private model: ModelCtor<IItemModel>) {}

    public createItem = (payload: {
        title: string;
        CollectionId: number;
        UserId: number;
    }): Promise<IItemModel> => this.model.create(payload);

    private findItems = (param?: {
        [key: string]: number | string;
    }): Promise<IItemModel[]> =>
        this.model.findAll(param ? { where: param } : {});

    public findCollectionItems = (
        CollectionId: number
    ): Promise<IItemModel[]> => this.findItems({ CollectionId });
}

const collectionService = new CollectionService(ItemModel);

export default collectionService;
