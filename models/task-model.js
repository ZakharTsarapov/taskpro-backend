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
      default: "",
      required: [true, 'There must be description']
    },
    priority: {
      type: String,
      enum: priorities,
      default: priorities[0],
    },
    deadLine: {
      type: String,
      match: deadlineRegExp,
      default: null,
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
