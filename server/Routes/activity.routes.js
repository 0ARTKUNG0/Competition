import express from 'express';
import activityController from '../controllers/Activity.controllers.js';

const router = express.Router();

// Activity CRUD routes
router.post('/', activityController.createActivity);           // Create activity
router.get('/', activityController.getAllActivities);         // Get all activities
router.get('/:id', activityController.getActivityById);       // Get activity by ID
router.put('/:id', activityController.updateActivity);        // Update activity
router.delete('/:id', activityController.deleteActivity);     // Delete activity

// Team management routes (placeholder for future implementation)
router.post('/:id/teams', activityController.addTeam);        // Add team to activity
router.post('/:id/judges', activityController.addJudge);      // Add judge to activity
router.post('/:id/scores', activityController.addScore);      // Add score to activity
router.post('/:id/awards', activityController.announceAward); // Announce award

export default router;
