import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.c2gwoqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const roommateSchema = new mongoose.Schema({
  title: String,
  location: String,
  rent: Number,
  roomType: String,
  lifestyle: [String],
  description: String,
  contactInfo: String,
  availability: { type: String, enum: ['available', 'not available'], default: 'available' },
  userEmail: String,
  userName: String,
  likeCount: { type: Number, default: 0 }
}, { timestamps: true });

const Roommate = mongoose.model('Roommate', roommateSchema);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/roommates', async (req, res) => {
  try {
    const data = req.body;
    const roommate = new Roommate(data);
    await roommate.save();
    res.status(201).json({ message: 'Roommate listing created', roommate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/', async (req, res) => {
  try {
    res.send('welcome');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/roommates', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const filter = req.query.available === 'true' ? { availability: 'available' } : {};
    const roommates = await Roommate.find(filter).limit(limit);
    res.json(roommates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/roommates/:id', async (req, res) => {
  try {
    const roommate = await Roommate.findById(req.params.id);
    if (!roommate) return res.status(404).json({ error: 'Not found' });
    res.json(roommate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/roommates/:id', async (req, res) => {
  try {
    const updated = await Roommate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Roommate listing updated', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/roommates/:id', async (req, res) => {
  try {
    const deleted = await Roommate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Roommate listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/my-listings', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const listings = await Roommate.find({ userEmail: email });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/roommates/:id/like', async (req, res) => {
  try {
    const roommate = await Roommate.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    if (!roommate) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Liked', likeCount: roommate.likeCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});