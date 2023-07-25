import { ModelCtor } from 'sequelize';

import FieldValueModel from '../models/fieldValue.model.js';

import {
    IFieldValueModel,
    FindFieldValues,
    FindItemFieldsValues,
    SetFieldValue,
    UpdateFieldsValue,
    FindFieldValueById,
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

    public updateFieldValue: UpdateFieldsValue = async (id, value) => {
        await this.fieldValueModel.update({ value }, { where: { id } });
    };

    public findFieldValueById: FindFieldValueById = (id, scopes) =>
        this.fieldValueModel.scope(scopes).findOne({ where: { id } });
}

export default new FieldValueService(FieldValueModel);
