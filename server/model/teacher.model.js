import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "./db.js";

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
    sequelize,
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

// Teacher.sync({ force: true })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });
export default Teacher;

