import { NextFunction, Request, Response } from 'express';

import searchService from '../services/Search.service.js';

import { Search } from '../types/search.types.js';

class SearchController {
    constructor(private search: Search) {}

    public handleSearch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { query } = req.query;
            if (typeof query === 'string') {
                const result = await this.search(query);
                res.send(result.hits.hits);
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new SearchController(searchService.search);
