import { Schema, model } from 'mongoose';
import { priorities } from '../constants/arrays.js';
import { deadlineRegExp } from '../constants/regExp.js';
import { handleMongooseError } from '../helpers/index.js';

const taskSchema = new Schema(
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
    taskOwner: {
      type: Schema.Types.ObjectId,
      ref: 'column', //перевірити точну назву//
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

export default Task;
