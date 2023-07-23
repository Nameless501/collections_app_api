import { Bucket } from '@google-cloud/storage';

export type HandleFileUpload = (
    bucket: Bucket,
    file: Express.Multer.File,
    id: number
) => Promise<string>;

export type UploadCollectionImage = (
    file: Express.Multer.File,
    collectionId: number
) => Promise<string>;
