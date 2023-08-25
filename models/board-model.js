import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../../helpers/index.js';
import { array } from '../../constants/arrays.js';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must be the name of the board.'],
    },
    icon: {
      type: String,
      enum: array.icons,
      default: array.icons[0],
    },
    background: {
      type: String,
      enum: array.backgrounds.concat([null]),
      default: null,
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
