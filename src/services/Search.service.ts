import { Client } from '@elastic/elasticsearch';

import { elasticConfig } from '../configs/elasticsearch.config.js';

import {
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
} from '../types/search.types.js';

import DefaultError from '../errors/Default.error.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

import { IItemModel } from '../types/items.types.js';

import { SearchIndexes } from '../configs/enums.config.js';

class SearchService {
    constructor(private client: Client) {}

    private index: Index = async (index, id, document) => {
        try {
            await this.client.index({ index, id: `${id}`, document });
        } catch (err) {
            throw new DefaultError();
        }
    };

    private update: Index = async (index, id, body) => {
        try {
            await this.client.update({ index, id: `${id}`, body });
        } catch (err) {
            throw new DefaultError();
        }
    };

    private handleError: HandleError = (err) => {
        if (typeof err === 'object' && err != null && 'statusCode' in err) {
            if (err.statusCode === HttpStatusCodes.notFound) {
                return;
            }
        }
        throw new DefaultError();
    };

    public deleteIndex: DeleteIndex = async (index, id) => {
        try {
            await this.client.delete({ index, id: `${id}` });
        } catch (err) {
            this.handleError(err);
        }
    };

    public search: Search = (query, index?) =>
        this.client.search({
            index,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['title', 'subject', 'description', 'value'],
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
        this.index(SearchIndexes.items, item.id, itemData);
    };

    public indexNewComment: IndexNewComment = async ({ id, itemId, value }) => {
        await this.update(SearchIndexes.items, itemId, {
            script: {
                source: 'ctx._source.comments.add(params.comment)',
                lang: 'painless',
                params: {
                    comment: { id, value },
                },
            },
        });
    };
}

export default new SearchService(new Client(elasticConfig));
