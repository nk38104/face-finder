const userService   = require("../services/user");
const error         = require("../errors/errors");


const getUsers = async (req, resp) => {
    try {
        const users = await userService.getUserList();
        resp.status(200).json(users);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};


const getUser = async (req, resp) => {
    try {
        const user = await userService.getUser(req.params);

        if(!user) { throw error.NotFoundError; }

        resp.status(200).json(user);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};

const updateUser = async (req, resp) => {
    try {
        const user = await userService.updateUser(req.body);

        if(!user) { throw error.NotFoundError; }

        resp.status(200).send(user);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
}


const updateUserIncrement = async (req, resp) => {    
    try {
        const entries = await userService.updateUserEntries(req.params);
        resp.status(200).send(entries);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};


const deleteUser = async (req, resp) => {
    try {
        const id = await userService.deleteUser(req.params);
        resp.status(200).send(id);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
};


module.exports = {
    getUsers,
    getUser,
    updateUser,
    updateUserIncrement,
    deleteUser,
}
