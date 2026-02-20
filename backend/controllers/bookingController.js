const Booking = require('../models/Booking');
const Expert = require('../models/Expert');

// POST /api/bookings — double booking prevented by unique index (no transaction needed)
exports.createBooking = async (req, res, next) => {
  try {
    const { expertId, clientName, clientEmail, clientPhone, date, timeSlot, notes } = req.body;

    // Validate required fields
    if (!expertId || !clientName || !clientEmail || !clientPhone || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: expertId, clientName, clientEmail, clientPhone, date, timeSlot',
      });
    }

    // Check expert exists and slot is available
    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ success: false, message: 'Expert not found' });
    }

    const daySlots = expert.availableSlots.find((s) => s.date === date);
    if (!daySlots || !daySlots.slots.includes(timeSlot)) {
      return res.status(400).json({ success: false, message: 'Selected time slot is not available' });
    }

    // Check for existing active booking
    const existingBooking = await Booking.findOne({
      expertId,
      date,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This slot has just been booked. Please select another.',
      });
    }

    // Remove slot from expert availability atomically
    await Expert.updateOne(
      { _id: expertId, 'availableSlots.date': date },
      { $pull: { 'availableSlots.$.slots': timeSlot } }
    );

    // Create booking — unique index catches any race condition that slips through
    const booking = await Booking.create({
      expertId,
      expertName: expert.name,
      clientName,
      clientEmail,
      clientPhone,
      date,
      timeSlot,
      notes,
    });

    // Emit real-time slot update to all connected clients
    const io = req.app.get('io');
    io.emit('slotBooked', { expertId, date, timeSlot });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    // MongoDB unique index violation — slot was taken in a race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This slot was just taken. Please select another time.',
      });
    }
    next(error);
  }
};

// GET /api/bookings?email=
exports.getBookingsByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email query parameter is required' });
    }

    const bookings = await Booking.find({ clientEmail: email.toLowerCase() }).sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // If cancelled, restore the slot back to expert's availability
    if (status === 'cancelled') {
      await Expert.updateOne(
        { _id: booking.expertId, 'availableSlots.date': booking.date },
        { $addToSet: { 'availableSlots.$.slots': booking.timeSlot } }
      );

      const io = req.app.get('io');
      io.emit('slotRestored', {
        expertId: booking.expertId,
        date: booking.date,
        timeSlot: booking.timeSlot,
      });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};
