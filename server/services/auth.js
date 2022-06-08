const authDAO = require("../dao/auth");
const error   = require("../errors/errors");


const signinUser = (signinDTO) => {
    const { email, password } = signinDTO;

    if( !email || !password) {
        throw error.InvalidRequestError;
    }

    return authDAO.signinUser(email, password);
}


module.exports = {
    signinUser
}
