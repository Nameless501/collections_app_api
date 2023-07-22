import { ClientOptions } from '@elastic/elasticsearch';

import 'dotenv/config.js';

const { ELASTIC_CLOUD_ID, ELASTIC_USERNAME, ELASTIC_PASSWORD } = process.env;

export const elasticConfig: ClientOptions = {
    cloud: {
        id: ELASTIC_CLOUD_ID ?? '',
    },
    auth: {
        username: ELASTIC_USERNAME ?? '',
        password: ELASTIC_PASSWORD ?? '',
    },
};
