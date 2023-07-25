import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

import { IItemModel } from './items.types.js';

import { IFieldValueModel } from './fieldValues.types.js';

import { ICollectionModel } from './collections.types.js';

import { ICommentModel } from './comments.types.js';

export type Index = (id: number, document: object) => Promise<void>;

export type DeleteIndex = (id: number) => Promise<void>;

export type Search = (query: string) => Promise<SearchResponse>;

export type HandleError = (err: unknown) => void | never;

export type FormatTagsData = (item: IItemModel) => string[];

export type FormatFieldsData = (
    item: IItemModel
) => Partial<IFieldValueModel>[];

export type FormatCollectionData = (
    item: IItemModel
) => Partial<ICollectionModel>;

export type ItemFormattedDataType = {
    title: string;
    fields: Partial<IFieldValueModel>[];
    tags: string[];
    collection: Partial<ICollectionModel>;
    comments: Partial<ICommentModel>[];
};

export type FormatNewItemData = (item: IItemModel) => ItemFormattedDataType;

export type IndexNewItem = (item: IItemModel) => void;

export type IndexNewComment = (comment: ICommentModel) => Promise<void>;

export type UpdateCollectionIndex = (
    comment: Partial<ICollectionModel>,
    itemId: number
) => Promise<void>;

export type DeleteCommentIndex = (comment: ICommentModel) => Promise<void>;

export type UpdateFieldValueIndex = (
    field: IFieldValueModel,
    value: string
) => Promise<void>;

export type SeedFormattedDataType = {
    id: number;
    data: ItemFormattedDataType;
};

export type IndexSeedsData = (data: SeedFormattedDataType[]) => Promise<void>;
