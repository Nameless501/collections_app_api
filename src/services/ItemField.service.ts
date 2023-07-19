import { ModelCtor } from 'sequelize';

import FieldValueModel from '../models/fieldValue.model.js';

import {
    IFieldValueModel,
    FieldValueCredentialsType,
    FieldValueResultType,
} from '../types/fieldValues.type.js';

class ItemFieldService {
    constructor(private itemFieldModel: ModelCtor<IFieldValueModel>) {}

    public setFieldValue = async (
        payload: FieldValueCredentialsType
    ): Promise<FieldValueResultType> => {
        const value = await this.itemFieldModel.create(payload);
        const field = await value.getField();
        return { field, value };
    };
}

export default new ItemFieldService(FieldValueModel);
