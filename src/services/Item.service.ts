import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

class CollectionService {
    constructor(private model: ModelCtor<IItemModel>) {}

    public createItem = (payload: ItemCredentialsType): Promise<IItemModel> =>
        this.model.create(payload);

    private findItems = (
        param?: Partial<ItemCredentialsType>
    ): Promise<IItemModel[]> =>
        this.model.findAll(param ? { where: param } : {});

    public findCollectionItems = (
        CollectionId: number
    ): Promise<IItemModel[]> => this.findItems({ CollectionId });
}

const collectionService = new CollectionService(ItemModel);

export default collectionService;
