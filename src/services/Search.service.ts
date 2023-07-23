import { Client } from '@elastic/elasticsearch';

import { elasticConfig } from '../configs/elasticsearch.config.js';

import {
    DeleteCommentIndex,
    DeleteIndex,
    FormatCollectionData,
    FormatFieldsData,
    FormatNewItemData,
    FormatTagsData,
    HandleError,
    Index,
    IndexNewComment,
    IndexNewItem,
    Search,
    UpdateCollectionIndex,
} from '../types/search.types.js';

import DefaultError from '../errors/Default.error.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

import { IItemModel } from '../types/items.types.js';

import { SearchIndexes } from '../configs/enums.config.js';

class SearchService {
    constructor(private client: Client) {}

    private handleError: HandleError = (err) => {
        if (typeof err === 'object' && err != null && 'statusCode' in err) {
            if (err.statusCode === HttpStatusCodes.notFound) {
                return;
            }
        }
        throw new DefaultError();
    };

    private index: Index = async (id, document) => {
        try {
            await this.client.index({
                index: SearchIndexes.items,
                id: `${id}`,
                document,
            });
        } catch (err) {
            throw new DefaultError();
        }
    };

    private checkItem = async (id: number) =>
        this.client.get({ id: `${id}`, index: SearchIndexes.items });

    private update: Index = async (id, body) => {
        try {
            await this.checkItem(id);
            await this.client.update({
                index: SearchIndexes.items,
                id: `${id}`,
                body,
            });
        } catch (err) {
            this.handleError(err);
        }
    };

    public deleteIndex: DeleteIndex = async (id) => {
        try {
            await this.checkItem(id);
            await this.client.delete({
                index: SearchIndexes.items,
                id: `${id}`,
            });
        } catch (err) {
            this.handleError(err);
        }
    };

    public search: Search = (query) =>
        this.client.search({
            index: SearchIndexes.items,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['*'],
                        fuzziness: 'AUTO',
                    },
                },
            },
        });

    private formatTagsData: FormatTagsData = (item) => {
        const tags = item.getDataValue('tags');
        return tags ? tags.map(({ value }) => value) : [];
    };

    private formatCollectionData: FormatCollectionData = (item) => {
        const collection = item.getDataValue('collection');
        if (collection) {
            const { title, subject, description } = collection;
            return { title, subject, description };
        }
        return {};
    };

    private formatFieldsData: FormatFieldsData = (item) => {
        const fields = item.getDataValue('fields');
        return fields ? fields.map(({ id, value }) => ({ id, value })) : [];
    };

    private formatNewItemData: FormatNewItemData = (item) => ({
        title: item.title,
        tags: this.formatTagsData(item),
        collection: this.formatCollectionData(item),
        fields: this.formatFieldsData(item),
        comments: [],
    });

    public indexNewItem: IndexNewItem = (item: IItemModel) => {
        const itemData = this.formatNewItemData(item);
        this.index(item.id, itemData);
    };

    public indexNewComment: IndexNewComment = async ({ id, itemId, value }) => {
        await this.update(itemId, {
            script: {
                source: 'ctx._source.comments.add(params.comment)',
                lang: 'painless',
                params: {
                    comment: { id, value },
                },
            },
        });
    };

    public updateCollectionIndex: UpdateCollectionIndex = async (
        { title, subject, description },
        itemId
    ) => {
        await this.update(itemId, {
            doc: {
                collection: { title, subject, description },
            },
        });
    };

    public deleteCommentIndex: DeleteCommentIndex = async ({ id, itemId }) => {
        await this.update(itemId, {
            script: {
                source: `for (int i=ctx._source.comments.length-1; i>=0; i--) {
                    if (ctx._source.comments[i].id == params.id) {
                        ctx._source.comments.remove(i);
                    }}`,
                lang: 'painless',
                params: {
                    id: id,
                },
            },
        });
    };
}

export default new SearchService(new Client(elasticConfig));
