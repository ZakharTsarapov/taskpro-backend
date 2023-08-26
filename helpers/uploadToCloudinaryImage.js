import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinaryImage = async req => {
  const { _id } = req.user;
  const imagePath = req.file.path;
  const uniqueFilename = `${_id}-avatar`;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    uniqueFilename,
  };

  try {
    return await cloudinary.uploader.upload(imagePath, options); // Upload the image
  } catch (error) {
    console.error(error);
  }
};

export default uploadToCloudinaryImage;
