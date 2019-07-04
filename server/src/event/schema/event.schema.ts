import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

export const EventSchema = new Schema({
  title: String,
  description: String,
  location: String,
  startDate: String,
  endDate: String,
  attendies: [String],
  hall: String,


});
