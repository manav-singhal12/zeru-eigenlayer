import mongoose from 'mongoose'
const rewardSchema = new mongoose.Schema({
  address: String,
  totalRewards: Number,
  breakdown: [{ validator: String, amount: Number, timestamp: Date }],
});
export default mongoose.model('Reward', rewardSchema);
