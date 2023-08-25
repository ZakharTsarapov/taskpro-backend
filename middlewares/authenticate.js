import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import {HttpError} from "../helpers/index.js";
import User from "../models/user-model.js";
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, 'Not authorized');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);

