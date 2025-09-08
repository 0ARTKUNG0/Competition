import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Teacher = User.init({
    school : {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    scopes: {
        defaultScope: {
            where: {
                type: 'teacher'
            },
        },
    },
    hooks: {
        beforeCreate(teacher) {
            teacher.type = 'teacher';
        }
    }
});

// User.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default Teacher;

