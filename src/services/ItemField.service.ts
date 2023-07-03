import { ModelCtor } from 'sequelize';

import ItemFieldModel from '../models/itemField.model.js';

import {
    IItemFieldModel,
    ItemFieldCredentialsType,
    ItemFieldResultType,
} from '../types/itemFields.type.js';

class ItemFieldService {
    constructor(private itemFieldModel: ModelCtor<IItemFieldModel>) {}

    public setFieldValue = async (
        payload: ItemFieldCredentialsType
    ): Promise<ItemFieldResultType> => {
        const value = await this.itemFieldModel.create(payload);
        const field = await value.getField();
        return { field, value };
    };
}

export default new ItemFieldService(ItemFieldModel);
