import express from 'express';
import { Types } from 'mongoose';
import { createInternship, Internship } from '../models/internship';

const router = express.Router();

router.post('/internship', async (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('Not authenticated');
    }

    // Create the internship
    const internship = createInternship({
        title: req.body.title,
        description: req.body.description,
        companyName: req.body.companyName,
        tags: req.body.tags,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        hoursPerWeek: req.body.hoursPerWeek,
        hourlyRate: req.body.hourlyRate,
        applicationUrl: req.body.applicationUrl,
        approved: false,
        // @ts-ignore - _id always exists on the User object despite TypeScript not recognizing it
        creator: req.user._id,
    });
    await internship.save();

    res.status(200).send(internship);
});

router.get('/internship/:id', async (req, res) => {
    // Validate the ID so it doesn't crash the server if it's invalid
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }

    // Find the internship
    const internship = await Internship.findOne({ _id: req.params.id });
    if (!internship) {
        return res.status(404).send('Internship not found');
    }

    res.status(200).send(internship);
});

export { router as internshipRouter };