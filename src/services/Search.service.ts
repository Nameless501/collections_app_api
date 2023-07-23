import { Client } from '@elastic/elasticsearch';

import { elasticConfig } from '../configs/elasticsearch.config.js';

import { DeleteIndex, Index, Search } from '../types/search.types.js';

import DefaultError from '../errors/Default.error.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

class SearchService {
    constructor(private client: Client) {}

    public index: Index = async (index, id, document) => {
        try {
            await this.client.index({ index, id: `${id}`, document });
        }
        catch(err) {
            throw new DefaultError();
        }
    };

    private handleError = (err: unknown) => {
        if(typeof err === 'object' && err != null && 'statusCode' in err) {
            if(err.statusCode === HttpStatusCodes.notFound) {
                return;
            }
        }
        throw new DefaultError();
    }

    public deleteIndex: DeleteIndex = async (index, id) => {
        try {
            await this.client.delete({ index, id: `${id}` });
        }
        catch(err) {
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
                    },
                },
            },
        });
}

export default new SearchService(new Client(elasticConfig));
