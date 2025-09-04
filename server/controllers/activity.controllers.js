import Activity from "../model/activity.model.js";

const activityController = {};

// Create new activity
activityController.createActivity = async (req, res) => {
    try {
        const {
            name, description, type, level, team_size, date, location,
            reg_open, reg_close, contact_name, contact_phone, contact_email, status
        } = req.body;

        const activity = await Activity.create({
            name, description, type, level, team_size, date, location,
            reg_open, reg_close, contact_name, contact_phone, contact_email, status
        });

        res.status(201).json({
            success: true,
            message: 'Activity created successfully',
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating activity',
            error: error.message
        });
    }
};

// Get all activities
activityController.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json({
            success: true,
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching activities',
            error: error.message
        });
    }
};

// Get activity by ID
activityController.getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        res.status(200).json({
            success: true,
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching activity',
            error: error.message
        });
    }
};

// Update activity
activityController.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const [updatedRowsCount] = await Activity.update(updateData, {
            where: { id: id }
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        const updatedActivity = await Activity.findByPk(id);
        res.status(200).json({
            success: true,
            message: 'Activity updated successfully',
            data: updatedActivity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating activity',
            error: error.message
        });
    }
};

// Delete activity
activityController.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowsCount = await Activity.destroy({
            where: { id: id }
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Activity deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting activity',
            error: error.message
        });
    }
};

// Future methods for team management
activityController.addTeam = async (req, res) => {
    // TODO: Implement team addition logic
    res.status(501).json({
        success: false,
        message: 'Team management not implemented yet'
    });
};

activityController.addJudge = async (req, res) => {
    // TODO: Implement judge addition logic
    res.status(501).json({
        success: false,
        message: 'Judge management not implemented yet'
    });
};

activityController.addScore = async (req, res) => {
    // TODO: Implement scoring logic
    res.status(501).json({
        success: false,
        message: 'Scoring system not implemented yet'
    });
};

activityController.announceAward = async (req, res) => {
    // TODO: Implement award announcement logic
    res.status(501).json({
        success: false,
        message: 'Award system not implemented yet'
    });
};

export default activityController;

