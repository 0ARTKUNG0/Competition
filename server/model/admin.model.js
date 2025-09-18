import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "./db.js";

const Admin = User.init({}, {
    sequelize,
    scopes: {
        defaultScope: {
            where: {
                type: 'admin'
            },
        },
    hooks: {
        beforeCreate(admin) {
            admin.type = 'admin';
        }
    }
}});
// Admin.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default Admin;