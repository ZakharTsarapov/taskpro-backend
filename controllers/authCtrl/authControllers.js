import User from '../../models/user-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';

const { JWT_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    name,
    email,
    token,
    theme: newUser.theme,
    avatarURL: newUser.avatarURL,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  // const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '720h' });
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
  //const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.json({
    name: user.name,
    email: user.email,
    token,
    theme: user.theme,
    avatarURL: user.avatarURL,
    refreshToken,
  });
};

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
  //const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  await User.findByIdAndUpdate(id, { token, refreshToken });

  res.redirect(`${FRONTEND_URL}?token=${token}&refreshToken=${refreshToken}`);
};

const refresh = async (req, res) => {
  const { refreshToken: tokenRef } = req.body;
  try {
    const { id } = jwt.verify(tokenRef, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: tokenRef });
    if (!isExist) {
      throw HttpError(403, 'Token invalid');
    }

    const payload = {
      id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '23h' });
    //const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    await User.findByIdAndUpdate(id, { token, refreshToken });

    res.json({ token, refreshToken });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '', refreshToken: '' });

  res.json({
    message: 'Signout ssucess',
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  googleAuth: ctrlWrapper(googleAuth),
  refresh: ctrlWrapper(refresh),
  signout: ctrlWrapper(signout),
};
