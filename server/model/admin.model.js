import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Admin = User.init({}, {
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
// User.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default Admin;