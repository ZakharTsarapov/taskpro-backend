import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import { HttpError } from '../helpers/index.js';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = reg.headers;
  const [bearer, token] = authenticate.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, 'Not authorized'));
  }
};

export default authenticate;
