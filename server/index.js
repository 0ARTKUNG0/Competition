import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './model/db.js';
import activityRoutes from './Routes/activity.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/activities', activityRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Activity Management API is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
