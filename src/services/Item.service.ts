import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

class CollectionService {
    constructor(private itemModel: ModelCtor<IItemModel>) {}

    public createItem = (payload: ItemCredentialsType): Promise<IItemModel> =>
        this.itemModel.create(payload);

    private findItems = (
        param?: Partial<ItemCredentialsType>
    ): Promise<IItemModel[]> => this.itemModel.findAll({ where: param });

    public findCollectionItems = (
        collectionId: number
    ): Promise<IItemModel[]> => this.findItems({ collectionId });
}

const collectionService = new CollectionService(ItemModel);

export default collectionService;
