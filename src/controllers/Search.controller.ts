import { NextFunction, Request, Response } from 'express';

import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

import searchService from '../services/Search.service.js';

import { SearchIndexes } from '../configs/enums.config.js';

class SearchController {
    constructor(
        private search: (
            query: string,
            index?: SearchIndexes
        ) => Promise<SearchResponse>
    ) {}

    public handleSearch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { query, tags } = req.query;
            if (typeof query === 'string') {
                const result = await this.search(
                    query,
                    tags ? SearchIndexes.tags : undefined
                );
                res.send(result.hits.hits);
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new SearchController(searchService.search);
