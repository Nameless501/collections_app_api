import { Response, NextFunction } from 'express';

import { TypedRequest } from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import fieldService from '../services/Field.service.js';

import {
    IItemModel,
    ItemCredentialsType,
    ItemResponseType,
} from '../types/items.types.js';

import { HttpStatusCodes } from '../configs/httpResponce.config.js';

import {
    ItemFieldCredentialsType,
    ItemFieldResultType,
} from '../types/itemFields.type.js';

class ItemsController {
    constructor(
        private createItem: (
            payload: ItemCredentialsType
        ) => Promise<IItemModel>,
        private setFieldValue: (
            payload: ItemFieldCredentialsType
        ) => Promise<ItemFieldResultType>
    ) {}

    private handleItemCreate = async (
        payload: ItemCredentialsType
    ): Promise<ItemResponseType> => {
        const item = await this.createItem(payload);
        const fields = await Promise.all(
            payload.fields.map((field) =>
                this.setFieldValue({ ...field, itemId: item.id })
            )
        );
        return { item, fields };
    };

    public handleNewItem = async (
        req: TypedRequest<ItemCredentialsType>,
        res: Response<ItemResponseType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.handleItemCreate({
                ...req.body,
                userId: req.userId as number,
            });
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };
}

const itemsController = new ItemsController(
    itemService.createItem,
    fieldService.setFieldValue
);

export default itemsController;
