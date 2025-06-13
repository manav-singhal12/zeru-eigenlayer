import Restaker from '../models/restaker.model.js';

export const getRestakers = async (req, res) => {
  try {
    const restakers = await Restaker.find({});
    res.json(restakers);
  } catch (err) {
    console.error('Error fetching restakers:', err);
    res.status(500).json({ error: 'Server error while fetching restakers' });
  }
};
