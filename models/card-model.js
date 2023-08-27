import { Schema, model } from 'mongoose';
import { priorities } from '../constants/arrays.js';
import { deadlineRegExp } from '../constants/regExp.js';
import { handleMongooseError } from '../helpers/index.js';

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must be the name of the card.'],
    },
    description: {
      type: String,
      required: [true, 'Must be the description of the card.'],
    },
    priority: {
      type: String,
      enum: priorities,
      default: priorities[0],
    },
    deadLine: {
      type: Date,
      match: deadlineRegExp,
      default: Date.now(),
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: 'column', //перевірити точну назву//
    },
  },
  { versionKey: false, timestamps: false }
);

cardSchema.post('save', handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
