// 💙💛  Kostiantyn Koshyk
import { Schema, model } from 'mongoose';
import Joi from 'joi';
import handleMongooseError from '../helpers/handleMangooseError.js';
import { emailRegExp, passwordRegExp } from '../constants/regExp.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      match: passwordRegExp,
      required: true,
    },
    avatarURL: {
      type: String,
      default: '/', // добавить ссылку на дефолтное значение
    },
    token: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      enum: ['without priority', 'low', 'medium', 'high'],
      default: 'low',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('without priority', 'low', 'medium', 'high').required(),
});

export const User = model('user', userSchema);
