const Expert = require('../models/Expert');

// GET /api/experts — with pagination, search, filter
exports.getExperts = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [experts, total] = await Promise.all([
      Expert.find(query)
        .select('-availableSlots')
        .sort({ rating: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Expert.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: experts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/experts/:id
exports.getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ success: false, message: 'Expert not found' });
    }
    res.json({ success: true, data: expert });
  } catch (error) {
    next(error);
  }
};
