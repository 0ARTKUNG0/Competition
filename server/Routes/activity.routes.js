import express from 'express';
import activityController from '../controllers/Activity.controllers.js';
import authJwt from '../middleware/authjwt.js';

const router = express.Router();
// create activity (admin only)
router.post('/', [authJwt.verifytoken, authJwt.isAdmin], activityController.createActivity);
// get all activities
router.get('/', activityController.getAllActivities);
// get activity by id
router.get('/:id', activityController.getActivityById);
// update activity (admin only)
router.put('/:id', [authJwt.verifytoken, authJwt.isAdmin], activityController.updateActivity);
// delete activity (admin only)
router.delete('/:id', [authJwt.verifytoken, authJwt.isAdmin], activityController.deleteActivity);
// search activities
router.get('/search', activityController.searchActivities);


export default router;
