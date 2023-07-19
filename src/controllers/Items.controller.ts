import { Response, NextFunction } from 'express';

import { ScopeType, TypedRequest, UserRequest } from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import itemFieldService from '../services/ItemField.service.js';

import fieldService from '../services/Field.service.js';

import tagService from '../services/Tag.service.js';

import {
    IItemModel,
    ItemCredentialsType,
    ItemResponseType,
} from '../types/items.types.js';

import {
    FieldValueCredentialsType,
    FieldValueResultType,
} from '../types/fieldValues.type.js';

import { ITagModel, TagsCredentialsType } from '../types/tags.types.js';

import { IFieldValueModel } from '../types/fieldValues.type.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

import { ItemScopes } from '../configs/enums.config.js';

class ItemsController {
    constructor(
        private findAllItems: (
            scopes?: ScopeType<ItemScopes>
        ) => Promise<IItemModel[]>,
        private createItem: (
            payload: ItemCredentialsType
        ) => Promise<IItemModel>,
        private findCollectionItems: (
            collectionId: number,
            scopes?: ScopeType<ItemScopes>
        ) => Promise<IItemModel[]>,
        private findItemFieldsValues: (
            itemId: number
        ) => Promise<IFieldValueModel[]>,
        private setFieldValue: (
            payload: FieldValueCredentialsType
        ) => Promise<FieldValueResultType>,
        private findOrCreateTag: (
            payload: TagsCredentialsType
        ) => Promise<ITagModel>
    ) { }

    private handleNewItemFields = (
        fieldsList: Array<FieldValueCredentialsType>,
        itemId: number
    ): Promise<FieldValueResultType[]> =>
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
        return { item, fields: [] };
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

    private getItemFields = (items: IItemModel[]): Promise<ItemResponseType[]> => Promise.all(items.map(async (item) => {
        const fields = await this.findItemFieldsValues(item.id);
        return {item, fields};
    }));

    public handleCollectionItems = async (
        req: UserRequest,
        res: Response<ItemResponseType[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findCollectionItems(
                Number(req.params.collectionId),
                [ItemScopes.withCollection]
            );
            const itemWithFields = await this.getItemFields(items)
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };

    public handleRecentItems = async (
        req: UserRequest,
        res: Response<ItemResponseType[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findAllItems(
                [ItemScopes.withCollection, ]
            );
            items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            const itemWithFields = await this.getItemFields(items.slice(0, 5));
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };
}

export default new ItemsController(
    itemService.findAllItems,
    itemService.createItem,
    itemService.findCollectionItems,
    fieldService.findItemFieldsValues,
    itemFieldService.setFieldValue,
    tagService.findOrCreateTag
);
