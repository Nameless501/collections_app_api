import 'dotenv/config.js';

import { Storage } from '@google-cloud/storage';

const {
    CS_BUCKET_NAME,
    CS_PROJECT_ID,
    CS_KEY_ID,
    CS_KEY,
    CS_EMAIL,
    CS_CLIENT_ID,
    CS_CLIENT_CERT_URI,
} = process.env;

const config = {
    type: 'service_account',
    project_id: CS_PROJECT_ID ?? '',
    private_key_id: CS_KEY_ID ?? '',
    private_key: CS_KEY ?? '',
    client_email: CS_EMAIL ?? '',
    client_id: CS_CLIENT_ID ?? '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: CS_CLIENT_CERT_URI ?? '',
    universe_domain: 'googleapis.com',
};

const cloudStorage = new Storage({
    projectId: CS_PROJECT_ID ?? '',
    credentials: config,
});

export const collectionImagesBucket = cloudStorage.bucket(CS_BUCKET_NAME ?? '');
