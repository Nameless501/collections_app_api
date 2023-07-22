import { Client } from '@elastic/elasticsearch';

import { elasticConfig } from '../configs/elasticsearch.config.js';

import { SearchIndexes } from '../configs/enums.config.js';

class SearchService {
    constructor(private client: Client) {}

    public index = async (
        index: SearchIndexes,
        id: number,
        document: { [key: string]: string | number }
    ) => {
        this.client.index({ index, id: `${id}`, document });
    };

    public deleteIndex = async (index: SearchIndexes, id: number) => {
        this.client.delete({ index, id: `${id}` });
    };

    public search = (query: string, index?: SearchIndexes) =>
        this.client.search({
            index,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['title', 'subject', 'description', 'value'],
                    },
                },
            },
        });
}

export default new SearchService(new Client(elasticConfig));
