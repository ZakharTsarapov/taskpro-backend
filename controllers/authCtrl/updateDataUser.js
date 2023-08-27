// import bcrypt from 'bcryptjs';
// import User from '../../models/user-model.js';
// import updateUserSchema from '../../shemas/update-user-schema.js';
// import { BadRequestError, uploadToCloudinaryImage } from '../../helpers/index.js';
// import { ctrlWrapper } from '../../decorators/index.js';

// const updateDataUser = async (req, res, next) => {
//   const { _id, name: oldName, email: oldEmail } = req.user;

//   const { value, error } = updateUserSchema.validate(req.body, {
//     abortEarly: false,
//   });

//   if (error) {
//     BadRequestError(error);
//   }

//   const { name = oldName, email, password } = value;
//   const updateDataUser = {
//     name,
//   };

//   if (email && email !== oldEmail) {
//     updateDataUser.email = email;
//     //updateDataUser.token = '';
//     //res.status(204).json();
//   }

//   if (password) {
//     const hashPassword = await bcrypt.hash(password, 10);
//     updateDataUser.password = hashPassword;
//     //updateDataUser.token = '';
//     //res.status(204).json();
//   }

//   if (req.file) {
//     updateDataUser.avatarURL = await uploadToCloudinaryImage(req);
//   }

//   const data = await User.findByIdAndUpdate(_id, updateDataUser, {
//     new: true,
//     //select: 'name email avatarURL -_id',
//   });
//   res.status(200).json(data);
// };
// export default { updateDataUser: ctrlWrapper(updateDataUser) };

import bcrypt from 'bcryptjs';
import User from '../../models/user-model.js';
import updateUserSchema from '../../shemas/update-user-schema.js';
import { BadRequestError, uploadToCloudinaryImage } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const updateDataUser = async (req, res, next) => {
  const { _id, name: oldName, email: oldEmail, avatarURL: oldAvatar } = req.user;

  const { value, error } = updateUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    BadRequestError(error);
  }

  const { name = oldName, email, password } = value;
  const updateDataUser = {
    name,
  };

  if (email && email !== oldEmail) {
    updateDataUser.email = email;
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    updateDataUser.password = hashPassword;
  }

  if (req.file && req.file !== oldAvatar) {
    await deleteFileFromServer(oldAvatar);
    updateDataUser.avatarURL = await uploadToCloudinaryImage(req);
  }

  try {
    const data = await User.findByIdAndUpdate(_id, updateDataUser, {
      new: true,
      //select: 'name email avatarURL -_id',
    });

    if (!data) {
      throw new Error('Failed to update user data');
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const deleteFileFromServer = async filePath => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.log(`Failed to delete file: ${filePath}`);
  }
};

export default { updateDataUser: ctrlWrapper(updateDataUser) };
