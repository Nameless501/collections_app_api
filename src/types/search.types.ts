import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

import { SearchIndexes } from '../configs/enums.config.js';

export type Index = (
    index: SearchIndexes,
    id: number,
    document: { [key: string]: string | number }
) => Promise<void>;

export type DeleteIndex = (index: SearchIndexes, id: number) => Promise<void>;

export type Search = (
    query: string,
    index?: SearchIndexes
) => Promise<SearchResponse>;
