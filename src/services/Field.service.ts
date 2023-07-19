import { ModelCtor } from 'sequelize';

import FieldModel from '../models/field.model.js';

import {
    IFieldModel,
    FieldCredentialsType,
    FieldWithValueType,
} from '../types/fields.type.js';

import { IItemModel } from '../types/items.types.js';

class FieldService {
    constructor(private fieldModel: ModelCtor<IFieldModel>) {}

    public createFields = (
        payload: Array<FieldCredentialsType>
    ): Promise<IFieldModel[]> => this.fieldModel.bulkCreate(payload);

    private findFields = (payload: Partial<IFieldModel>) =>
        this.fieldModel.findAll({ where: payload });

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

    public findFieldById = async (id: number): Promise<IFieldModel>  => {
        const fields = await this.findFields({ id });
        return fields[0]
    }

    public updateField = async (
        payload: Partial<IFieldModel>,
        id: number
    ): Promise<void> => {
        await this.fieldModel.update(payload, { where: { id } });
    };

    public deleteField = async (id: number[]): Promise<void> => {
        await this.fieldModel.destroy({ where: { id } });
    }
}

export default new FieldService(FieldModel);
