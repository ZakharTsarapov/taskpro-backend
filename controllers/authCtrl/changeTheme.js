import User from '../../models/user-model.js';
import fs from 'fs/promises';
import { ctrlWrapper } from "../../decorators/index.js"

const changeTheme =  async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;
  const result = await User.findByIdAndUpdate(_id, req.body);
  if (!result) throw HttpError(404);

  res.json({
    theme,
    message: `The theme has been changed.`,
  });
};

export default {
  changeTheme: ctrlWrapper(changeTheme) };