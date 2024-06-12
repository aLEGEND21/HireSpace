import express from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';
import cors from 'cors';
import { json } from 'body-parser';
import { accountRouter } from './routes/account';
import { profileRouter } from './routes/profile';
import { internshipRouter } from './routes/internship';
import { User } from './models/user';

const LocalStrategy = passportLocal.Strategy;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Change this to the URL of your frontend
  credentials: true,
}));
app.use(json());
app.use(session({
  secret: 'secret', // Change this to a random string
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session());
app.use(accountRouter);
app.use(profileRouter);
app.use(internshipRouter);

// Configure passport-local to use the MongoDB datbase when authenticating users
passport.use(new LocalStrategy(async (username, password, done) => {
  // Find the user
  const user = await User.findOne({ username: username });
  if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
  }

  // Verify the password
  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  if (hash !== user.password) {
      return done(null, false, { message: 'Invalid username or password' });
  }

  return done(null, user);
}));

// Serialize the user ID to the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize the user ID from the session
passport.deserializeUser(async (id: string, done) => {
  const user = await User.findOne({ _id: id });
  done(null, user);
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/srip-hs-internship-finder');
mongoose.connection.on('connected', () => {
  console.log('[database] Connected to MongoDB');
});

app.listen(3000, () => {
  console.log('[server] Listening on port 3000');
});

