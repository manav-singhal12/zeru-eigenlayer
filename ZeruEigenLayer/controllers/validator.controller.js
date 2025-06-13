import Validator from '../models/validator.model.js';

export const getValidators = async (req, res) => {
  try {
    const validators = await Validator.find({});
    res.json(validators);
  } catch (err) {
    console.error('Error fetching validators:', err);
    res.status(500).json({ error: 'Server error while fetching validators' });
  }
};
