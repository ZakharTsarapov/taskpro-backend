import multer from 'multer';
import path from 'path';

const tempDir = path.resolve('temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${file.originalname}`;

    cb(null, fileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage: multerConfig,
  limits,
});

export default upload;
