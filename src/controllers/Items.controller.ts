import { Response, NextFunction } from 'express';

import { TypedRequest } from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import { IItemModel, ItemCredentialsType } from '../types/items.types.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

class ItemsController {
    constructor(
        private createItem: (
            payload: ItemCredentialsType
        ) => Promise<IItemModel>
    ) {}

    private handleItemCreate = (
        payload: ItemCredentialsType
    ): Promise<IItemModel> => this.createItem(payload);

    public handleNewItem = async (
        req: TypedRequest<ItemCredentialsType>,
        res: Response<IItemModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.handleItemCreate({
                ...req.body,
                CollectionId: Number(req.params.collectionId),
                UserId: req.UserId as number,
            });
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };
}

const itemsController = new ItemsController(itemService.createItem);

export default itemsController;
