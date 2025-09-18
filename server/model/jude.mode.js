import User from "./user.model.js";
import sequelize from "./db.js";

const Jude = User.init({}, {
    sequelize,
    scopes: {
        defaultScope: {
            where: {
                type: 'jude'
            },
        },
    },
    hooks: {
        beforeCreate(jude) {
            jude.type = 'jude';
        }
    }
});

// Jude.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });

export default Jude;