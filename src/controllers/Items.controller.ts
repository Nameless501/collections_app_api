import { Response, NextFunction } from 'express';

import {
    ResponseWithMessage,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import itemService from '../services/Item.service.js';

import fieldValueService from '../services/FieldValue.service.js';

import tagService from '../services/Tag.service.js';

import searchService from '../services/Search.service.js';

import {
    IItemModel,
    ItemRequestType,
    FindAllItems,
    FindItemById,
    CreateItem,
    FindCollectionItems,
    DeleteItem,
} from '../types/items.types.js';

import {
    FieldValueCredentialsType,
    FindItemFieldsValues,
    SetFieldValue,
} from '../types/fieldValues.types.js';

import { FindOrCreateTag, ITagModel } from '../types/tags.types.js';

import { IFieldValueModel } from '../types/fieldValues.types.js';

import { Index } from '../types/search.types.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';

import { ItemScopes, SearchIndexes } from '../configs/enums.config.js';

import { checkEditRights } from '../utils/helpers.util.js';

class ItemsController {
    constructor(
        private findAllItems: FindAllItems,
        private findItemById: FindItemById,
        private createItem: CreateItem,
        private findCollectionItems: FindCollectionItems,
        private findItemFieldsValues: FindItemFieldsValues,
        private deleteItems: DeleteItem,
        private setFieldValue: SetFieldValue,
        private findOrCreateTag: FindOrCreateTag,
        private index: Index
    ) {}

    private createNewItemFields = async (
        fieldsList: Array<FieldValueCredentialsType>,
        item: IItemModel
    ): Promise<void> => {
        const fields = await Promise.all(
            fieldsList.map((field) =>
                this.setFieldValue({ ...field, itemId: item.id })
            )
        );
        item.setDataValue('fields', fields);
    };

    private createNewItemTags = (
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

    private getItemTags = async (
        tagsList: string[],
        item: IItemModel
    ): Promise<void> => {
        const tags = await this.createNewItemTags(tagsList, item);
        item.setDataValue('tags', tags);
    };

    private getItemCollection = async (item: IItemModel): Promise<void> => {
        const collection = await item.getCollection();
        item.setDataValue('collection', collection);
    };

    private handleItemCreate = ({
        title,
        collectionId,
    }: ItemRequestType): Promise<IItemModel> =>
        this.createItem({ title, collectionId });

    private getNewItemData = async (
        item: IItemModel,
        req: TypedRequest<ItemRequestType>
    ) => {
        await this.getItemCollection(item);
        if (req.body.fields) {
            await this.createNewItemFields(req.body.fields, item);
        }
        if (req.body.tags) {
            await this.getItemTags(req.body.tags, item);
        }
    };

    private handleItemDataCreate = async (
        req: TypedRequest<ItemRequestType>
    ): Promise<IItemModel> => {
        const item = await this.handleItemCreate({
            ...req.body,
            collectionId: Number(req.params.collectionId),
        });
        await this.getNewItemData(item, req);
        return item;
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

    private indexNewItem = async (item: IItemModel) => {
        await this.indexItem(item);
        if (item.fields) {
            await this.indexFields(item.fields);
        }
        if (item.tags) {
            await this.indexTags(item.tags);
        }
    };

    public handleNewItem = async (
        req: TypedRequest<ItemRequestType>,
        res: Response<IItemModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.handleItemDataCreate(req);
            await this.indexNewItem(item);
            res.status(HttpStatusCodes.dataCreated).send(item);
        } catch (err) {
            next(err);
        }
    };

    private getItemFields = async (item: IItemModel): Promise<void> => {
        const fields = await this.findItemFieldsValues(item.id);
        item.setDataValue('fields', fields);
    };

    private getItemsFields = async (items: IItemModel[]): Promise<void> => {
        await Promise.all(items.map((item) => this.getItemFields(item)));
    };

    public handleGetCollectionItems = async (
        req: UserRequest,
        res: Response<IItemModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findCollectionItems(
                Number(req.params.collectionId),
                [ItemScopes.withCollection, ItemScopes.withLikes]
            );
            await this.getItemsFields(items);
            res.send(items);
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
        res: Response<IItemModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items = await this.findMostRecentItems();
            await this.getItemsFields(items);
            res.send(items);
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

    public handleGetItemData = async (
        req: UserRequest,
        res: Response<IItemModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const item = await this.findItemById(Number(req.params.itemId), [
                ItemScopes.withCollection,
                ItemScopes.withTags,
                ItemScopes.withLikes,
            ]);
            await this.getItemFields(item);
            res.send(item);
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
    fieldValueService.findItemFieldsValues,
    itemService.deleteItem,
    fieldValueService.setFieldValue,
    tagService.findOrCreateTag,
    searchService.index
);
