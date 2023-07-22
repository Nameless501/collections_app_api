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

import searchService from '../services/Search.service.js';

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

import { ItemScopes, SearchIndexes } from '../configs/enums.config.js';

import { checkEditRights } from '../utils/helpers.util.js';

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
        private deleteItems: (id: number) => Promise<void>,
        private setFieldValue: (
            payload: FieldValueCredentialsType
        ) => Promise<IFieldValueModel>,
        private findOrCreateTag: (value: string) => Promise<ITagModel>,
        private index: (
            index: SearchIndexes,
            id: number,
            document: { [key: string]: string | number }
        ) => Promise<void>
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
                const itemTag = await item.addTag(newTag);
                newTag.setDataValue('itemTags', itemTag);
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

    private indexItem = ({ id, title }: IItemModel): Promise<void> =>
        this.index(SearchIndexes.items, id, { itemId: id, title });

    private indexFields = (fields: IFieldValueModel[]): Promise<void[]> =>
        Promise.all(
            fields.map(({ id, value, itemId }) =>
                this.index(SearchIndexes.fieldValues, id, { itemId, value })
            )
        );

    private indexTags = (tags: ITagModel[]): Promise<void[]> =>
        Promise.all(
            tags.map((tag) => {
                const itemTag = tag.getDataValue('itemTags');
                if (typeof itemTag === 'object' && !Array.isArray(itemTag)) {
                    this.index(SearchIndexes.tags, itemTag.id, {
                        itemId: itemTag.itemId,
                        value: tag.value,
                    });
                }
            })
        );

    private indexNewItem = async ({ item, fields, tags }: ItemResponseType) => {
        await this.indexItem(item);
        await this.indexFields(fields);
        if (tags) {
            await this.indexTags(tags);
        }
    };

    public handleNewItem = async (
        req: TypedRequest<ItemRequestType>,
        res: Response<ItemResponseType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.createItemWithFields(req);
            await this.indexNewItem(item);
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

    public handleGetCollectionItems = async (
        req: UserRequest,
        res: Response<ItemResponseType[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findCollectionItems(
                Number(req.params.collectionId),
                [ItemScopes.withCollection, ItemScopes.withLikes]
            );
            const itemWithFields = await this.getItemsFields(items);
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };

    private findMostRecentItems = async (): Promise<IItemModel[]> => {
        const items = await this.findAllItems([
            ItemScopes.withCollection,
            ItemScopes.withLikes,
        ]);
        items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return items.slice(0, 5);
    };

    public handleRecentItems = async (
        req: UserRequest,
        res: Response<ItemResponseType[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findMostRecentItems();
            const itemWithFields = await this.getItemsFields(items);
            res.send(itemWithFields);
        } catch (err) {
            next(err);
        }
    };

    private checkItemEditRights = async (req: UserRequest): Promise<void> => {
        const item = await this.findItemById(Number(req.params.itemId));
        const { userId } = await item.getCollection();
        checkEditRights(req, userId);
    };

    public handleItemDelete = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkItemEditRights(req);
            await this.deleteItems(Number(req.params.itemId));
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
                ItemScopes.withLikes,
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
    tagService.findOrCreateTag,
    searchService.index
);
