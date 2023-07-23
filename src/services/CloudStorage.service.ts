import { Bucket } from '@google-cloud/storage';

import { collectionImagesBucket } from '../configs/cloudStorage.config.js';

import {
    HandleFileUpload,
    UploadCollectionImage,
} from '../types/cloudStorage.types.js';

class CloudStorageService {
    constructor(private collectionImagesBucket: Bucket) {}

    private handleFileUpload: HandleFileUpload = (
        bucket,
        { originalname, buffer },
        id
    ) =>
        new Promise((resolve) => {
            const file = bucket.file(`${id}.${originalname.split('.').pop()}`);
            const fileStream = file.createWriteStream({ resumable: false });
            fileStream
                .on('finish', () => resolve(file.publicUrl()))
                .end(buffer);
        });

    public uploadCollectionImage: UploadCollectionImage = async (
        file,
        collectionId
    ) => this.handleFileUpload(this.collectionImagesBucket, file, collectionId);
}

export default new CloudStorageService(collectionImagesBucket);
