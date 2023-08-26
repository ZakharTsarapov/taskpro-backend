import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';
import { backgrounds, icons } from '../constants/arrays.js';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must be the name of the board.'],
    },
    icon: {
      type: String,
      enum: icons,
      default: icons[0],
    },
    background: {
      type: String,
      enum: backgrounds,
      default: backgrounds[0],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: 'true',
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

export default Board;
