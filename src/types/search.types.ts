import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

import { SearchIndexes } from '../configs/enums.config.js';
import { IItemModel } from './items.types.js';
import { IFieldValueModel } from './fieldValues.types.js';
import { ICollectionModel } from './collections.types.js';
import { ICommentModel } from './comments.types.js';

export type Index = (
    index: SearchIndexes,
    id: number,
    document: object
) => Promise<void>;

export type DeleteIndex = (index: SearchIndexes, id: number) => Promise<void>;

export type Search = (
    query: string,
    index?: SearchIndexes
) => Promise<SearchResponse>;

export type HandleError = (err: unknown) => void | never;

export type FormatTagsData = (item: IItemModel) => string[];

export type FormatFieldsData = (
    item: IItemModel
) => Partial<IFieldValueModel>[];

export type FormatCollectionData = (
    item: IItemModel
) => Partial<ICollectionModel>;

export type FormatNewItemData = (item: IItemModel) => {
    title: string;
    fields: Partial<IFieldValueModel>[];
    tags: string[];
    collection: Partial<ICollectionModel>;
};

export type IndexNewItem = (item: IItemModel) => void;

export type IndexNewComment = (comment: ICommentModel) => Promise<void>;
