// 💙💛  Kostiantyn Koshyk
import  User  from '../../models/user-model.js';
import fs from 'fs/promises';
import { ctrlWrapper } from '../../decorators/index.js';

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath } = req.file;
  const newPath = () => {
    'Укразать путь для записи в Cloudinary';
    console.log('add to Cloudinary');
    return;
  };

  await fs.rename(oldPath, newPath);

  const getAvatarFromCloudinary = () => {
    console.log('get from Cloudinary');
    const avatarUrl = '';
    return avatarUrl;
  };

  await User.findByIdAndUpdate(_id, { avatarURL: getAvatarFromCloudinary() });

  res.json({ avatarURL: getAvatarFromCloudinary() });
};

export default {
  updateAvatar: ctrlWrapper(updateAvatar),
};
