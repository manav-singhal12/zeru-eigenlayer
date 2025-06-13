import mongoose from 'mongoose';

const restakerSchema = new mongoose.Schema({
  address: String,
  validator: String,
  amount: Number,
});
export default mongoose.model('Restaker', restakerSchema);
