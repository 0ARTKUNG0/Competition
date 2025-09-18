import { DataTypes } from "sequelize";
import sequelize from "./db.js";

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
// VerificationToken.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default VerificationToken;
