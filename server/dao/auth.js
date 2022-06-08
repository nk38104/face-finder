const bcrypt    = require('bcryptjs');
const database  = require("../db/db_context");
const error     = require("../errors/errors");


const signinUser = async (email, password) => {
    return await
    database("login")
    .select("email", "hash")
    .where({ email: email })
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);
        if (isValid) {
            return database("users")
            .select("id", "username", "email", "entries", "joined")
            .where({ email: email })
            .then(([user]) => user)
            .catch(() => { throw error.InternalServerError; });
        }
        throw error.InvalidCredentialsError;
    })
    .catch((err) => {
        switch(err.status) {
            case 401:
                throw error.InvalidCredentialsError;
            case 404:
                throw error.NotFoundError;
            case 500:
                throw error.InternalServerError;
            default:
                throw error.InternalServerError;
        }
     });
}


module.exports = {
    signinUser
}
