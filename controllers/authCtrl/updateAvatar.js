// 💙💛  Kostiantyn Koshyk
import User from '../../models/user-model.js';
import fs from 'fs/promises';
import { ctrlWrapper } from '../../decorators/index.js';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const { CLRY_API_KEY, CLRY_API_SECRET, CLRY_CLOUD_NAME } = process.env;

cloudinary.config({
  cloud_name: CLRY_CLOUD_NAME,
  api_key: CLRY_API_KEY,
  api_secret: CLRY_API_SECRET,
});

const uploadImage = async imagePath => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    return await cloudinary.uploader.upload(imagePath, options); // Upload the image
  } catch (error) {
    console.error(error);
  }
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  // const _id = '64e87f9ef0051006daa5ef98'; // !!! TEST
  const { path: oldPath } = req.file; // прилетел переименованный jpg

  const { url } = await uploadImage(oldPath);
  const avatarURL = {
    avatarURL: url,
  };

  await fs.unlink(oldPath);

  await User.findByIdAndUpdate(_id, avatarURL);
  res.json(avatarURL);
};

export default {
  updateAvatar: ctrlWrapper(updateAvatar),
};
