import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js';
import activityRoutes from './Routes/activity.routes.js';
import cors from 'cors';
import db from './model/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    // process.env.FRONTEND_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const initializeDatabase = async () => {
  try {
    // Force sync database - this will drop and recreate all tables with proper relationships
    await db.sequelize.authenticate();
    console.log("Database connection established.");
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true });
      console.log("All models were synchronized successfully.");
    } else {
      console.log("Skipping force sync in production mode.");
    }
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

app.get('/', (req, res) => {
  res.send('SCI Competition Useful API')
});

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});