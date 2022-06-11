const userService = require("../services/user");
const authService = require("../services/auth");


const register = async (req, resp) => {
    try {
        const id = await userService.createUser(req.body);
        resp.status(200).send(id);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};


const signIn = async (req, resp) => {
    try {
        const user = await authService.signinUser(req.body);
        resp.status(200).send(user);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};


module.exports = {
    register,
    signIn
}
