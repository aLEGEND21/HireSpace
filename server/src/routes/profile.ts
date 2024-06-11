import express from 'express';

const router = express.Router();

router.get('/profile/@me', async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not authenticated');
    }
});

export { router as profileRouter };