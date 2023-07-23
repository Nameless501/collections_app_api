import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import {
    CreateItem,
    DeleteItem,
    FindAllItems,
    FindCollectionItems,
    FindItemById,
    FindItems,
    IItemModel,
} from '../types/items.types.js';

class CollectionService {
    constructor(private itemModel: ModelCtor<IItemModel>) {}

    public createItem: CreateItem = (payload) => this.itemModel.create(payload);

    private findItems: FindItems = (param, scopes) =>
        this.itemModel.scope(scopes).findAll({ where: param });

    public findCollectionItems: FindCollectionItems = (collectionId, scopes) =>
        this.findItems({ collectionId }, scopes);

    public findAllItems: FindAllItems = (scopes) =>
        this.findItems(undefined, scopes);

    public findItemById: FindItemById = async (id, scopes) => {
        const [item] = await this.findItems({ id }, scopes);
        return item;
    };

    public deleteItem: DeleteItem = async (id) => {
        await this.itemModel.destroy({ where: { id } });
    };
}

export default new CollectionService(ItemModel);
