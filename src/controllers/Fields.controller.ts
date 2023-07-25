import { Response, NextFunction } from 'express';

import {
    ResponseWithMessage,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import fieldService from '../services/Field.service.js';

import collectionService from '../services/Collection.service.js';

import fieldValueService from '../services/FieldValue.service.js';

import searchService from '../services/Search.service.js';

import {
    DeleteField,
    FieldCredentialsType,
    FindCollectionFields,
    FindFieldById,
    IFieldModel,
    UpdateField,
} from '../types/fields.types.js';

import {
    FindCollectionById,
    ICollectionModel,
} from '../types/collections.types.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';

import { checkEditRights } from '../utils/helpers.util.js';

import {
    FindFieldValueById,
    IFieldValueModel,
    UpdateFieldValueRequestType,
    UpdateFieldsValue,
} from '../types/fieldValues.types.js';

import { UpdateFieldValueIndex } from '../types/search.types.js';
import { FieldValueScopes } from '../configs/enums.config.js';

class FieldsController {
    constructor(
        private updateField: UpdateField,
        private deleteField: DeleteField,
        private updateFieldValue: UpdateFieldsValue,
        private findFieldById: FindFieldById,
        private findCollectionFields: FindCollectionFields,
        private findCollectionById: FindCollectionById,
        private updateFieldValueIndex: UpdateFieldValueIndex,

        private findFieldValueById: FindFieldValueById
    ) {}

    private createCollectionFields = (
        { fields }: { fields: FieldCredentialsType[] },
        collection: ICollectionModel
    ): Promise<IFieldModel[]> =>
        Promise.all(fields.map((field) => collection.createField(field)));

    public handleNewCollectionFields = async (
        req: TypedRequest<{ fields: FieldCredentialsType[] }>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const collection = await this.findCollectionById(
                Number(req.params.collectionId)
            );
            checkEditRights(req, Number(collection.userId));
            const fields = await this.createCollectionFields(
                req.body,
                collection
            );
            res.status(HttpStatusCodes.dataCreated).send(fields);
        } catch (err) {
            next(err);
        }
    };

    private checkFieldEditRights = async (
        req: UserRequest,
        field?: IFieldModel
    ): Promise<void> => {
        let searchField = field;
        if (!searchField) {
            searchField = await this.findFieldById(Number(req.params.fieldId));
        }
        const { userId } = await searchField.getCollection();
        checkEditRights(req, userId);
    };

    private updateFieldData = async (
        req: TypedRequest<FieldCredentialsType>
    ) => {
        await this.updateField(req.body, Number(req.params.fieldId));
        return await this.findFieldById(Number(req.params.fieldId));
    };

    public handleUpdateField = async (
        req: TypedRequest<FieldCredentialsType>,
        res: Response<IFieldModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkFieldEditRights(req);
            const field = await this.updateFieldData(req);
            res.send(field);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteField = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkFieldEditRights(req);
            await this.deleteField(Number(req.params.fieldId));
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };

    public handleGetCollectionFields = async (
        req: UserRequest,
        res: Response<IFieldModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const fields = await this.findCollectionFields(
                Number(req.params.collectionId)
            );
            res.send(fields);
        } catch (err) {
            next(err);
        }
    };

    private updateFieldValueData = async (
        fieldValue: IFieldValueModel,
        value: string
    ) => {
        await this.updateFieldValue(fieldValue.id, value);
        await this.updateFieldValueIndex(fieldValue, value);
    };

    public handleUpdateFieldValue = async (
        req: TypedRequest<UpdateFieldValueRequestType>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            const fieldValue = await this.findFieldValueById(
                Number(req.params.fieldId),
                [FieldValueScopes.withField]
            );
            if (fieldValue) {
                await this.checkFieldEditRights(req, fieldValue.field);
                await this.updateFieldValueData(fieldValue, req.body.value);
                res.send({ message: HttpMessages.updateSuccess });
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new FieldsController(
    fieldService.updateField,
    fieldService.deleteField,
    fieldValueService.updateFieldValue,
    fieldService.findFieldById,
    fieldService.findCollectionFields,
    collectionService.findCollectionById,
    searchService.updateFieldValueIndex,
    fieldValueService.findFieldValueById
);
