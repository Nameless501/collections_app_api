import { ModelCtor } from 'sequelize';

import FieldValueModel from '../models/fieldValue.model.js';

import {
    IFieldValueModel,
    FieldValueCredentialsType,
} from '../types/fieldValues.type.js';

class ItemFieldService {
    constructor(private itemFieldModel: ModelCtor<IFieldValueModel>) {}

    public setFieldValue = async (
        payload: FieldValueCredentialsType
    ): Promise<IFieldValueModel> => {
        const value = await this.itemFieldModel.create(payload);
        const field = await value.getField();
        value.setDataValue('field', field);
        return value;
    };
}

export default new ItemFieldService(FieldValueModel);
