const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  slots: [{ type: String }], // ['09:00', '10:00', ...]
});

const expertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Finance', 'Health', 'Legal', 'Marketing', 'Design', 'Business', 'Education'],
    },
    bio: { type: String, default: '' },
    experience: { type: Number, required: true, min: 0 }, // years
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 0 },
    avatar: { type: String, default: '' },
    availableSlots: [timeSlotSchema],
  },
  { timestamps: true }
);

expertSchema.index({ name: 'text' });

module.exports = mongoose.model('Expert', expertSchema);
