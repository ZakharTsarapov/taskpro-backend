import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../../helpers/index.js';
import { arrays } from '../../constants/arrays.js';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must be the name of the board.'],
    },
    icon: {
      type: String,
      enum: arrays.icons,
      default: arrays.icons[0],
    },
    background: {
      type: String,
      enum: arrays.backgrounds,
      default: arrays.backgrounds[0],
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
