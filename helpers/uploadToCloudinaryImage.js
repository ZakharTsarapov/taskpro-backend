import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinaryImage = async req => {
  const { _id } = req.user;
  const imagePath = req.file.path;
  const uniqueFilename = `${_id}_avatar`;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    //public_id: `task-pro/avatars/${uniqueFilename}`,
    uniqueFilename,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);

    return result.secure_url;
  } catch (error) {
    error.message = 'Image processing error';
    return error;
  }

  // try {
  //   return await cloudinary.uploader.upload(imagePath, options); // Upload the image
  // } catch (error) {
  //   console.error(error);
  // }
};

export default uploadToCloudinaryImage;
