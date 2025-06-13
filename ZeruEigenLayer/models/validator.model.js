import mongoose from "mongoose";

const validatorSchema = new mongoose.Schema({
  operator: String,
  totalDelegated: Number,
  status: String,
  slashHistory: [{ when: Date, amount: Number, reason: String }],
});
export default mongoose.model('Validator', validatorSchema);
