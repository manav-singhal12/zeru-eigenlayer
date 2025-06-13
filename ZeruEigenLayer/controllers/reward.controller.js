import Reward from '../models/restaker.model.js';

export const getRewards = async (req, res) => {
  try {
    const address = req.params.address.toLowerCase();
    const reward = await Reward.findOne({ address });

    if (!reward) {
      return res.status(404).json({ error: 'No rewards found for this address' });
    }

    res.json(reward);
  } catch (err) {
    console.error('Error fetching rewards:', err);
    res.status(500).json({ error: 'Server error while fetching rewards' });
  }
};
