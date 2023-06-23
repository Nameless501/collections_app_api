import { Request, Response, NextFunction } from 'express';

import itemService from '../services/Item.service.js';

import { IItemModel } from '../models/item.model.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

type ItemCredentialsType = {
    title: string;
    CollectionId: number;
    UserId: number;
};

class ItemsController {
    constructor(
        private createItem: (
            payload: ItemCredentialsType
        ) => Promise<IItemModel>
    ) {}

    private handleItemCreate = ({
        title,
        CollectionId,
        UserId,
    }: ItemCredentialsType): Promise<IItemModel> =>
        this.createItem({ title, CollectionId, UserId });

    public handleNewItem = async (
        req: Request,
        res: Response<IItemModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const params = {
                ...req.body,
                CollectionId: Number(req.params.collectionId),
                UserId: Number(req.headers.UserId),
            };
            const item = await this.handleItemCreate(params);
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };
}

const itemsController = new ItemsController(itemService.createItem);

export default itemsController;
