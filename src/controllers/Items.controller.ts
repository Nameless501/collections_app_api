import { Request, Response, NextFunction } from 'express';

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
        req: Request,
        res: Response<IItemModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const payload = {
                ...req.body,
                CollectionId: Number(req.params.collectionId),
                UserId: Number(req.headers.UserId),
            };
            const item = await this.handleItemCreate(payload);
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };
}

const itemsController = new ItemsController(itemService.createItem);

export default itemsController;
