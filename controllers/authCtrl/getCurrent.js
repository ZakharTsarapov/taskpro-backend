import { ctrlWrapper } from '../../decorators/index.js';

const getCurrent = async (req, res) => {
  const { _id, name, email, theme, avatarURL } = req.user;
  res.status(200).json({ _id, name, email, theme, avatarURL });
};

export default { getCurrent: ctrlWrapper(getCurrent) };
