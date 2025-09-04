import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        minimum: 1
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reg_open: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reg_close: {
        type: DataTypes.DATE,
        allowNull: false
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please use a valid email address.'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        type: DataTypes.ENUM('upcoming', 'open', 'closed','in_progress', 'completed'),
        allowNull: false
    },

}, {
});

// Activity.sync({force: true}).then(() => {
//     console.log('Activity table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table Activity : ', error);
// });
export default Activity;