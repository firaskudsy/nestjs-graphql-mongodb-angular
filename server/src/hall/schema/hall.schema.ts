import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

export const HallSchema = new Schema({
  name: String,
  address: String,
  size: String,
  events: [String]



});
