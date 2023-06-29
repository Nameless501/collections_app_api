import { ModelCtor } from 'sequelize';

import FieldModel from '../models/field.model.js';

import {
    IFieldModel,
    FieldCredentialsType,
    FieldWithValueType,
} from '../types/fields.type.js';

import {
    ItemFieldCredentialsType,
    ItemFieldResultType,
} from '../types/itemFields.type.js';

import { IItemModel } from '../types/items.types.js';

class FieldService {
    constructor(private fieldModel: ModelCtor<IFieldModel>) {}

    public createFields = (
        payload: Array<FieldCredentialsType>
    ): Promise<IFieldModel[]> => this.fieldModel.bulkCreate(payload);

    private findFields = (payload: Partial<IFieldModel>) =>
        this.fieldModel.findAll({ where: payload });

    public setFieldValue = async ({
        itemId,
        fieldId,
        value,
    }: ItemFieldCredentialsType): Promise<ItemFieldResultType> => {
        const fields = await this.findFields({ id: fieldId });
        const fieldValue = await (fields[0] as IFieldModel).createItemField({
            itemId,
            value,
        });
        return { field: fields[0] as IFieldModel, value: fieldValue };
    };

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
}

const fieldService = new FieldService(FieldModel);

export default fieldService;
