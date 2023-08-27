import { Schema, model } from 'mongoose';
import { priorities } from '../constants/arrays';
import { deadlineRegExp } from '../constants/regExp';

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



const Card = model("card", cardSchema);

export default Card;
