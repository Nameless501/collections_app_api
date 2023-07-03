import { fileURLToPath } from 'node:url';

import 'dotenv/config.js';

import { Storage } from '@google-cloud/storage';

const cloudStorage = new Storage({
    keyFilename:
        fileURLToPath(new URL('.', import.meta.url)) +
        '../../cloudStorageKey.json',
    projectId: process.env.CLOUD_PROJECT_ID,
});

export const collectionImagesBucket = cloudStorage.bucket(
    process.env.CLOUD_BUCKET_NAME as string
);
