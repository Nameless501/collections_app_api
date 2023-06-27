import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import ItemFieldModel from '../models/itemField.model.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

class CollectionService {
    constructor(
        private itemModel: ModelCtor<IItemModel>,
        private itemFieldModel: ModelCtor<IItemFieldModel>
    ) {}

    public createItem = (payload: ItemCredentialsType): Promise<IItemModel> =>
        this.itemModel.create(payload, { include: this.itemFieldModel });

    private findItems = (
        param?: Partial<ItemCredentialsType>
    ): Promise<IItemModel[]> =>
        this.itemModel.findAll(param ? { where: param } : {});

    public findCollectionItems = (
        collectionId: number
    ): Promise<IItemModel[]> => this.findItems({ collectionId });
}

const collectionService = new CollectionService(ItemModel, ItemFieldModel);

export default collectionService;
