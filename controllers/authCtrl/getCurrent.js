import { ctrlWrapper } from '../../helpers/index.js';

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({ name, email });
};

export default { getCurrent: ctrlWrapper(getCurrent) };