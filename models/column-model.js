import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Must be the name of the column.'],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: true,
    },

    taskOrder: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post('save', handleMongooseError);

const Column = model('column', columnSchema);

export default Column;
