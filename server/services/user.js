const bcrypt    = require('bcryptjs');
const userDAO   = require("../dao/user");
const error     = require("../errors/errors");


const getUserList = async () => {
    return await userDAO.getUserList();
}


const getUser = async (getUserParams) => {
    const { id } = getUserParams;
    
    if (id < 1 || !id) { 
        throw error.InvalidRequestError;
    }

    return await userDAO.getUser(id);
}


const createUser = (createUserDTO) => {
    const { username, email, password } = createUserDTO;
    
    if(!username || !email || !password) {
        throw error.InvalidRequestError;
    }
    
    const hash = bcrypt.hashSync(password, 10);

    return userDAO.createUser(username, email, hash);
}


const updateUser = async (updateUserDTO) => {
    const { id, username, email } = updateUserDTO;
    
    if(!id || id < 1 || !username || !email) {
        throw error.InvalidRequestError;
    }

    return await userDAO.updateUser(id, username, email);
}


const updateUserEntries = async (updateEntriesParams) => {
    const { id } = updateEntriesParams;

    if (id < 1 || !id) { 
        throw error.InvalidRequestError;
    }

    return await userDAO.updateUserEntries(id);
}


const deleteUser = async (deleteParams) => {
    const { id } = deleteParams;

    if (id < 1 || !id) { 
        throw error.InvalidRequestError;
    }

    return await userDAO.deleteUser(id);
}


module.exports = {
    getUser,
    getUserList,
    createUser,
    updateUser,
    updateUserEntries,
    deleteUser
}
