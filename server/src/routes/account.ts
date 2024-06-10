import express from 'express';
import crypto from 'crypto';
import { User, createUser } from '../models/user';

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
})

router.post('/account/login', async (req, res) => {
    // Find the user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    // Verify the password
    const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (hash !== user.password) {
        return res.status(400).send('Invalid username or password');
    }

    res.status(200).send(user);
});

export { router as accountRouter };