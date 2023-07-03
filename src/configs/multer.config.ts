import Multer from 'multer';

const fileParser = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
}).single('file');

export default fileParser;
