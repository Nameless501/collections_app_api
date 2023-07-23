import { Client } from '@elastic/elasticsearch';

import { elasticConfig } from '../configs/elasticsearch.config.js';

import { DeleteIndex, Index, Search } from '../types/search.types.js';

class SearchService {
    constructor(private client: Client) {}

    public index: Index = async (index, id, document) => {
        this.client.index({ index, id: `${id}`, document });
    };

    public deleteIndex: DeleteIndex = async (index, id) => {
        this.client.delete({ index, id: `${id}` });
    };

    public search: Search = (query, index?) =>
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
