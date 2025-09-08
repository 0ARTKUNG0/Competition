import sequelize from "../model/db.js";
import { Sequelize } from "sequelize";
import Activity from "./activity.model.js";
import User from "./user.model.js";
import Teacher from "./teacher.model.js";
import Admin from "./admin.model.js";
import Jude from "./jude.mode.js";
import VerificationToken from "./verificationtoken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;
db.Teacher = Teacher;
db.Admin = Admin;
db.Jude = Jude;
db.VerificationToken = VerificationToken;

// Associations - Link Users and Activities
db.VerificationToken.belongsTo(db.User, { foreignKey: 'userId'});
db.User.belongsTo(db.VerificationToken, { foreignKey: 'userId'});

// Associations - Link Users and Roles through existing user_roles table
// db.User.belongsToMany(db.Role, {
//     through: "user_roles",
//     foreignKey: "userUsername",  // Foreign key in user_roles table
//     otherKey: "roleId",          // Other foreign key in user_roles table
//     as: "roles"                  // Alias for easier queries
// });

// db.Role.belongsToMany(db.User, {
//     through: "user_roles", 
//     foreignKey: "roleId",        // Foreign key in user_roles table
//     otherKey: "userUsername",    // Other foreign key in user_roles table
//     as: "users"                  // Alias for easier queries
// });

export default db;
