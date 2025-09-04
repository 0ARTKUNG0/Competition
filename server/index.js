import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js';
import activityRoutes from './Routes/activity.routes.js';
import cors from 'cors';
import db from './model/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

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
    // await db.sequelize.sync({ force: true });
    // console.log("Database synced successfully - all tables created with relationships");
    
    const Role = db.Role;
    
    // Create default roles
    const defaultRoles = [
      { id: 1, name: "admin" },
      { id: 2, name: "manger" }, 
      { id: 3, name: "teacher" },
      { id: 4, name: "judge" }
    ];
    
    await Role.bulkCreate(defaultRoles);
    console.log("Created default roles:", defaultRoles.map(r => r.name));
    
  } catch (error) {
    console.error("Error initializing database:", error);
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