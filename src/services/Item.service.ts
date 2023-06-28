import { ModelCtor } from 'sequelize';

import ItemModel from '../models/item.model.js';

import ItemFieldModel from '../models/itemField.model.js';

import TagModel from '../models/tag.model.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

import { ITagModel } from '../types/tags.types.js';

class CollectionService {
    constructor(
        private itemModel: ModelCtor<IItemModel>,
        private itemFieldModel: ModelCtor<IItemFieldModel>,
        private tagModel: ModelCtor<ITagModel>
    ) {}

    public createItem = (payload: ItemCredentialsType): Promise<IItemModel> =>
        this.itemModel.create(payload, { include: [this.itemFieldModel, this.tagModel] });

    private findItems = (
        param?: Partial<ItemCredentialsType>
    ): Promise<IItemModel[]> =>
        this.itemModel.findAll(param ? { where: param, include: [this.itemFieldModel, this.tagModel] } : { include: [this.itemFieldModel, this.tagModel] });

    public findCollectionItems = (
        collectionId: number
    ): Promise<IItemModel[]> => this.findItems({ collectionId });
}

const collectionService = new CollectionService(ItemModel, ItemFieldModel, TagModel);

export default collectionService;
