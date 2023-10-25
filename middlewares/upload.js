import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
// import path from 'path';

// const tempDir = path.resolve('temp');

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const fileName = `${uniquePrefix}_${file.originalname}`;

//     cb(null, fileName);
//   },
// });

// const limits = {
//   fileSize: 1024 * 1024 * 5,
// };

// const upload = multer({
//   storage: multerConfig,
//   limits,
// });

// export default upload;

cloudinary.config({
  cloud_name: process.env.CLRY_CLOUD_NAME,
  api_key: process.env.CLRY_API_KEY,
  api_secret: process.env.CLRY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatar",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
      const fileName = `avatar_${req.user.userId}`;
      cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
