import User from "./user.model.js";

const Jude = User.init({}, {
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

// User.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });

export default Jude;