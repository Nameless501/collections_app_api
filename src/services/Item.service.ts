import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import { ScopeType } from '../types/common.types.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

import { ItemScopes } from '../configs/enums.config.js';

class CollectionService {
    constructor(private itemModel: ModelCtor<IItemModel>) {}

    public createItem = (payload: ItemCredentialsType): Promise<IItemModel> =>
        this.itemModel.create(payload);

    private findItems = (
        param?: Partial<IItemModel>,
        scopes?: ScopeType<ItemScopes>
    ): Promise<IItemModel[]> =>
        this.itemModel.scope(scopes).findAll({ where: param });

    public findCollectionItems = (
        collectionId: number,
        scopes?: ScopeType<ItemScopes>
    ): Promise<IItemModel[]> => this.findItems({ collectionId }, scopes);

    public findAllItems = (
        scopes?: ScopeType<ItemScopes>
    ): Promise<IItemModel[]> => this.findItems(undefined, scopes);

    public findItemById = async (
        id: number,
        scopes?: ScopeType<ItemScopes>
    ): Promise<IItemModel> => {
        const items = await this.findItems({ id }, scopes);
        return items[0];
    };

    public deleteItems = async (id: number | number[]): Promise<void> => {
        await this.itemModel.destroy({ where: { id } });
    };
}

export default new CollectionService(ItemModel);
