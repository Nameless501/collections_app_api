import { Response, NextFunction } from 'express';

import { TypedRequest } from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import itemFieldService from '../services/ItemField.service.js';

import tagService from '../services/Tag.service.js';

import {
    IItemModel,
    ItemCredentialsType,
    ItemResponseType,
} from '../types/items.types.js';

import {
    ItemFieldCredentialsType,
    ItemFieldResultType,
} from '../types/itemFields.type.js';

import { ITagModel, TagsCredentialsType } from '../types/tags.types.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

class ItemsController {
    constructor(
        private createItem: (
            payload: ItemCredentialsType
        ) => Promise<IItemModel>,
        private setFieldValue: (
            payload: ItemFieldCredentialsType
        ) => Promise<ItemFieldResultType>,
        private findOrCreateTag: (
            payload: TagsCredentialsType
        ) => Promise<ITagModel>
    ) {}

    private handleNewItemFields = (
        fieldsList: Array<ItemFieldCredentialsType>,
        itemId: number
    ): Promise<ItemFieldResultType[]> =>
        Promise.all(
            fieldsList.map((field) => this.setFieldValue({ ...field, itemId }))
        );

    private handleNewItemTags = async (
        tagsList: Array<TagsCredentialsType>,
        item: IItemModel
    ): Promise<ITagModel[]> =>
        Promise.all(
            tagsList.map(async (tag) => {
                const newTag = await this.findOrCreateTag(tag);
                await item.addTag(newTag);
                return newTag;
            })
        );

    private handleItemCreate = async (
        payload: ItemCredentialsType
    ): Promise<ItemResponseType> => {
        const item = await this.createItem(payload);
        const fields = await this.handleNewItemFields(payload.fields, item.id);
        const tags = await this.handleNewItemTags(payload.tags, item);
        return { item, fields, tags };
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

export default new ItemsController(
    itemService.createItem,
    itemFieldService.setFieldValue,
    tagService.findOrCreateTag
);
