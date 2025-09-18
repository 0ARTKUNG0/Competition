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
db.User.hasMany(db.VerificationToken, { foreignKey: 'userId'});

export default db;
