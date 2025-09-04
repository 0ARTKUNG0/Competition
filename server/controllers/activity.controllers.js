import Activity from "../model/activity.model.js";
import { Op } from "sequelize";

const activityController = {};

// Create new activity
activityController.createActivity = async (req, res) => {
    try {
        const {
            name, description, type, level, team_size, date, location,
            reg_open, reg_close, contact_name, contact_phone, contact_email, status
        } = req.body;
        
        // Check required fields
        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Check for duplicate activity name
        const existingActivity = await Activity.findOne({ where: { name } });
        if (existingActivity) {
            return res.status(400).json({
                success: false,
                message: 'Activity with this name already exists'
            });
        }
        
        // Create activity
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
}

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
            message: 'Error fetching all activities',
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

        // Check required fields
        const { name, description, type, level, team_size, date, location,
            reg_open, reg_close, contact_name, contact_phone, contact_email, status } = updateData;
        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check for duplicate name (ignore current activity)
        const existingActivity = await Activity.findOne({ where: { name, id: { [Op.ne]: id } } });
        if (existingActivity) {
            return res.status(400).json({
                success: false,
                message: 'Activity with this name already exists'
            });
        }

        // Update activity
        const [updatedRowsCount] = await Activity.update(updateData, { where: { id } });
        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found or no changes made'
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
        const deletedRowsCount = await Activity.destroy({ where: { id } });
        // check if we got id
        if (deletedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }
        // if we got id
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

activityController.searchActivities = async (req, res) => {
    try {
        const { name, type, level, status, dateFrom, dateTo } = req.query;
        const whereClause = {};
        if (name) {
            whereClause.name = { [Op.like]: `%${name}%` };
        }
        if (type) {
            whereClause.type = type;
        }
        if (level) {
            whereClause.level = level;
        }
        if (status) {
            whereClause.status = status;
        }
        if (dateFrom && dateTo) {
            whereClause.date = { [Op.between]: [new Date(dateFrom), new Date(dateTo)] };
        } else if (dateFrom) {
            whereClause.date = { [Op.gte]: new Date(dateFrom) };
        }
        else if (dateTo) {
            whereClause.date = { [Op.lte]: new Date(dateTo) };
        }
        const activities = await Activity.findAll({ where: whereClause });
        res.status(200).json({
            success: true,
            data: activities
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching activities',
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

