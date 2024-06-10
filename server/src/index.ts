import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { exampleRouter } from './routes/exampleRouter';

const app = express();
app.use(json());
app.use(exampleRouter);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/srip-hs-internship-finder');
mongoose.connection.on('connected', () => {
  console.log('[database] Connected to MongoDB');
});

app.listen(3000, () => {
  console.log('[server] Listening on port 3000');
});

