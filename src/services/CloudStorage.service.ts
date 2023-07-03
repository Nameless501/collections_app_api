import { Bucket } from '@google-cloud/storage';

import { collectionImagesBucket } from '../configs/cloudStorage.config.js';

class CloudStorageService {
    constructor(private collectionImagesBucket: Bucket) {}

    private handleFileUpload = (
        bucket: Bucket,
        { originalname, buffer }: Express.Multer.File,
        id: number
    ): Promise<string> =>
        new Promise((resolve) => {
            const file = bucket.file(`${id}.${originalname.split('.').pop()}`);
            const fileStream = file.createWriteStream({ resumable: false });
            fileStream
                .on('finish', () => resolve(file.publicUrl()))
                .end(buffer);
        });

    public uploadCollectionImage = async (
        file: Express.Multer.File,
        collectionId: number
    ): Promise<string> =>
        this.handleFileUpload(this.collectionImagesBucket, file, collectionId);
}

export default new CloudStorageService(collectionImagesBucket);
