import { ModelCtor } from 'sequelize';

import FieldValueModel from '../models/fieldValue.model.js';

import {
    IFieldValueModel,
    FindFieldValues,
    FindItemFieldsValues,
    SetFieldValue,
} from '../types/fieldValues.types.js';

import { FieldValueScopes } from '../configs/enums.config.js';

class FieldValueService {
    constructor(private fieldValueModel: ModelCtor<IFieldValueModel>) {}

    public setFieldValue: SetFieldValue = async (payload) => {
        const value = await this.fieldValueModel.create(payload);
        const field = await value.getField();
        value.setDataValue('field', field);
        return value;
    };

    private findFieldValues: FindFieldValues = (payload, scopes) =>
        this.fieldValueModel.scope(scopes).findAll({ where: payload });

    public findItemFieldsValues: FindItemFieldsValues = (itemId) =>
        this.findFieldValues({ itemId }, [FieldValueScopes.withField]);
}

export default new FieldValueService(FieldValueModel);
