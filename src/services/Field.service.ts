import { ModelCtor } from 'sequelize';

import FieldModel from '../models/field.model.js';

import FieldValueModel from '../models/fieldValue.model.js';

import {
    IFieldModel,
    FieldCredentialsType,
    FieldWithValueType,
} from '../types/fields.type.js';

import { IItemModel } from '../types/items.types.js';

import { IFieldValueModel } from '../types/fieldValues.type.js';

import { ScopeType } from '../types/common.types.js';

import { FieldValueScopes } from '../configs/enums.config.js';

class FieldService {
    constructor(
        private fieldModel: ModelCtor<IFieldModel>,
        private fieldValueModel: ModelCtor<IFieldValueModel>
    ) {}

    public createFields = (
        payload: Array<FieldCredentialsType>
    ): Promise<IFieldModel[]> => this.fieldModel.bulkCreate(payload);

    private findFields = (payload: Partial<IFieldModel>) =>
        this.fieldModel.findAll({ where: payload });

    private findFieldValues = (
        payload: Partial<IFieldValueModel>,
        scopes?: ScopeType<FieldValueScopes>
    ) => this.fieldValueModel.scope(scopes).findAll({ where: payload });

    public findItemFields = async (
        item: IItemModel
    ): Promise<FieldWithValueType[]> => {
        const values = await item.getItemFields();
        return await Promise.all(
            values.map(async (value) => {
                const field = await value.getField();
                return { value, field };
            })
        );
    };

    public findItemFieldsValues = (
        itemId: number
    ): Promise<IFieldValueModel[]> =>
        this.findFieldValues({ itemId }, [FieldValueScopes.withField]);

    public findCollectionFields = (
        collectionId: number
    ): Promise<IFieldModel[]> =>
        this.fieldModel.findAll({ where: { collectionId } });

    public findFieldById = async (id: number): Promise<IFieldModel> => {
        const fields = await this.findFields({ id });
        return fields[0];
    };

    public updateField = async (
        payload: Partial<IFieldModel>,
        id: number
    ): Promise<void> => {
        await this.fieldModel.update(payload, { where: { id } });
    };

    public deleteField = async (id: number): Promise<void> => {
        await this.fieldModel.destroy({ where: { id } });
    };
}

export default new FieldService(FieldModel, FieldValueModel);
