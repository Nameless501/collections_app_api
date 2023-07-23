import { ModelCtor } from 'sequelize';

import FieldModel from '../models/field.model.js';

import {
    IFieldModel,
    FindFields,
    FindCollectionFields,
    FindFieldById,
    UpdateField,
    DeleteField,
} from '../types/fields.types.js';

class FieldService {
    constructor(private fieldModel: ModelCtor<IFieldModel>) {}

    private findFields: FindFields = (payload) =>
        this.fieldModel.findAll({ where: payload });

    public findCollectionFields: FindCollectionFields = (collectionId) =>
        this.fieldModel.findAll({ where: { collectionId } });

    public findFieldById: FindFieldById = async (id) => {
        const fields = await this.findFields({ id });
        return fields[0];
    };

    public updateField: UpdateField = async (payload, id) => {
        await this.fieldModel.update(payload, { where: { id } });
    };

    public deleteField: DeleteField = async (id) => {
        await this.fieldModel.destroy({ where: { id } });
    };
}

export default new FieldService(FieldModel);
