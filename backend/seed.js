require('dotenv').config();
const mongoose = require('mongoose');
const Expert = require('./models/Expert');

const generateSlots = () => {
  const slots = [];
  const today = new Date();
  for (let d = 1; d <= 7; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().split('T')[0];
    slots.push({
      date: dateStr,
      slots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    });
  }
  return slots;
};

const experts = [
  { name: 'Dr. Sarah Chen', category: 'Health', experience: 12, rating: 4.9, reviewCount: 234, hourlyRate: 150, bio: 'Board-certified physician specializing in preventive medicine and holistic health.' },
  { name: 'Marcus Williams', category: 'Finance', experience: 8, rating: 4.7, reviewCount: 189, hourlyRate: 120, bio: 'CFA-certified financial advisor with expertise in portfolio management and retirement planning.' },
  { name: 'Elena Rodriguez', category: 'Technology', experience: 10, rating: 4.8, reviewCount: 312, hourlyRate: 180, bio: 'Full-stack architect and cloud consultant with 10+ years building scalable systems.' },
  { name: 'James Okafor', category: 'Legal', experience: 15, rating: 4.6, reviewCount: 98, hourlyRate: 200, bio: 'Corporate attorney specializing in startup law, contracts, and IP protection.' },
  { name: 'Priya Patel', category: 'Marketing', experience: 7, rating: 4.5, reviewCount: 145, hourlyRate: 100, bio: 'Growth marketer and brand strategist who has scaled 50+ companies from seed to Series B.' },
  { name: 'David Kim', category: 'Design', experience: 9, rating: 4.9, reviewCount: 267, hourlyRate: 130, bio: 'Product designer and UX researcher formerly at Google and Airbnb.' },
  { name: 'Amanda Foster', category: 'Business', experience: 20, rating: 4.7, reviewCount: 411, hourlyRate: 250, bio: 'Serial entrepreneur and executive coach with 3 successful exits.' },
  { name: 'Carlos Mendes', category: 'Education', experience: 14, rating: 4.8, reviewCount: 178, hourlyRate: 90, bio: 'Curriculum designer and learning strategist specializing in online education.' },
  { name: 'Lisa Chang', category: 'Technology', experience: 6, rating: 4.4, reviewCount: 89, hourlyRate: 160, bio: 'AI/ML engineer specializing in NLP and computer vision applications.' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expert-booking');
    await Expert.deleteMany({});
    const withSlots = experts.map((e) => ({ ...e, availableSlots: generateSlots() }));
    await Expert.insertMany(withSlots);
    console.log('✅ Seeded', withSlots.length, 'experts');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
