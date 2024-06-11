import express from 'express';
import crypto from 'crypto';
import passport from 'passport';
import { createUser } from '../models/user';

const router = express.Router();

router.post('/account/register', async (req, res) => {
    // Salt and hash the password
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

    // Create the user
    const user = createUser({
        username: req.body.username,
        password: hash,
        salt: salt,
        email: req.body.email,
        role: req.body.role,
        internships: []
    });
    await user.save();

    res.status(200).send(user);
});

router.post('/account/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.status(200).send(req.user);
});

router.get('/account/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
    });
    res.status(200).send('Logged out');
});

export { router as accountRouter };