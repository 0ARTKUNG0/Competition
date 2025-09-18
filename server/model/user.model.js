import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Fix: id should be primary key, not username
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('admin', 'teacher', 'judge'), // Better to use ENUM
    allowNull: false,
  },
  isVerified: { // Fix: was "isVertified" 
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Add teacher-specific fields
  school: {
    type: DataTypes.STRING,
    allowNull: true, // Optional for non-teachers
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Optional for non-teachers
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  }
});

User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;