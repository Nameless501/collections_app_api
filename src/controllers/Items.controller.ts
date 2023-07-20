import { Response, NextFunction } from 'express';

import {
    ResponseWithMessage,
    ScopeType,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import itemFieldService from '../services/ItemField.service.js';

import fieldService from '../services/Field.service.js';

import tagService from '../services/Tag.service.js';

import {
    IItemModel,
    ItemCredentialsType,
    ItemResponseType,
    ItemRequestType,
} from '../types/items.types.js';

import { FieldValueCredentialsType } from '../types/fieldValues.type.js';

import { ITagModel } from '../types/tags.types.js';

import { IFieldValueModel } from '../types/fieldValues.type.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';

import { ItemScopes } from '../configs/enums.config.js';

class ItemsController {
    constructor(
        private findAllItems: (
            scopes?: ScopeType<ItemScopes>
        ) => Promise<IItemModel[]>,
        private findItemById: (
            id: number,
            scopes?: ScopeType<ItemScopes>
        ) => Promise<IItemModel>,
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
        private deleteItems: (id: number | number[]) => Promise<void>,
        private setFieldValue: (
            payload: FieldValueCredentialsType
        ) => Promise<IFieldValueModel>,
        private findOrCreateTag: (value: string) => Promise<ITagModel>
    ) {}

    private handleNewItemFields = (
        fieldsList: Array<FieldValueCredentialsType>,
        itemId: number
    ): Promise<IFieldValueModel[]> =>
        Promise.all(
            fieldsList.map((field) => this.setFieldValue({ ...field, itemId }))
        );

    private handleNewItemTags = async (
        tagsList: string[],
        item: IItemModel
    ): Promise<ITagModel[]> =>
        Promise.all(
            tagsList.map(async (tag) => {
                const newTag = await this.findOrCreateTag(tag);
                await item.addTag(newTag);
                return newTag;
            })
        );

    private handleItemCreate = async ({
        title,
        collectionId,
    }: ItemRequestType): Promise<IItemModel> => {
        const item = await this.createItem({ title, collectionId });
        const collection = await item.getCollection();
        item.setDataValue('collection', collection);
        return item;
    };

    private createItemWithFields = async (
        req: TypedRequest<ItemRequestType>
    ): Promise<ItemResponseType> => {
        const item = await this.handleItemCreate({
            ...req.body,
            collectionId: Number(req.params.collectionId),
        });
        const fields = await this.handleNewItemFields(req.body.fields, item.id);
        const tags = await this.handleNewItemTags(req.body.tags, item);
        return { item, fields, tags };
    };

    public handleNewItem = async (
        req: TypedRequest<ItemRequestType>,
        res: Response<ItemResponseType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.createItemWithFields(req);
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };

    private getItemFields = async (
        item: IItemModel
    ): Promise<ItemResponseType> => {
        const fields = await this.findItemFieldsValues(item.id);
        return { item, fields };
    };

    private getItemsFields = async (
        items: IItemModel[]
    ): Promise<ItemResponseType[]> =>
        Promise.all(items.map((item) => this.getItemFields(item)));

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
            const itemWithFields = await this.getItemsFields(items);
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
            const items = await this.findAllItems([ItemScopes.withCollection]);
            items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            const itemWithFields = await this.getItemsFields(items.slice(0, 5));
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };

    public handleItemsDelete = async (
        req: TypedRequest<{ id: number | number[] }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteItems(req.body.id);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };

    public handleItemData = async (
        req: UserRequest,
        res: Response<ItemResponseType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.findItemById(Number(req.params.itemId), [
                ItemScopes.withCollection,
                ItemScopes.withTags,
            ]);
            const itemWithFields = await this.getItemFields(item);
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };
}

export default new ItemsController(
    itemService.findAllItems,
    itemService.findItemById,
    itemService.createItem,
    itemService.findCollectionItems,
    fieldService.findItemFieldsValues,
    itemService.deleteItems,
    itemFieldService.setFieldValue,
    tagService.findOrCreateTag
);
