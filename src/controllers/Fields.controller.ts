import { Response, NextFunction } from 'express';

import { ResponseWithMessage, TypedRequest } from '../types/common.types.js';

import fieldService from '../services/Field.service.js';

import { FieldCredentialsType, IFieldModel } from '../types/fields.type.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

class FieldsController {
    constructor(
        private updateField: (
            payload: Partial<IFieldModel>,
            id: number
        ) => Promise<void>,
        private deleteField: (id: number[]) => Promise<void>,
        private findFieldById: (id: number) => Promise<IFieldModel>
    ) {}

    private updateFieldData = async (
        req: TypedRequest<FieldCredentialsType>
    ) => {
        await this.updateField(req.body, Number(req.params.fieldId));
        return await this.findFieldById(Number(req.params.fieldId));
    };

    public handleUpdateCollection = async (
        req: TypedRequest<FieldCredentialsType>,
        res: Response<IFieldModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const field = await this.updateFieldData(req);
            res.status(HttpStatusCodes.dataCreated).send(field);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteFields = async (
        req: TypedRequest<{ id: number[] }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteField(req.body.id);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };
}

export default new FieldsController(
    fieldService.updateField,
    fieldService.deleteField,
    fieldService.findFieldById
);
