import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import { TokenExpiredError } from "jsonwebtoken";

const VerificationToken = sequelize.define("verification_token", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id',}
    },
    expiresAt : {
        type: DataTypes.DATE,
        allowNull: false
    }
});
export default VerificationToken;
