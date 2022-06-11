const database  = require("../db/db_context");
const error     = require("../errors/errors");


const getUserList = async () => {
    return await 
    database("users")
    .select(["username", "email", "entries", "joined"])
    .catch(() => { throw error.InternalServerError; });
}


const getUser = async (id) => {
    return await 
    database("users")
    .select(["username", "email", "entries", "joined"])
    .where({ id: id })
    .then(([user]) => user)
    .catch(() => { throw error.InternalServerError; });
}


const createUser = async (username, email, hash) => {
    return await
    database
    .transaction(trx => {
        trx("login")
        .insert({
            hash:   hash,
            email:  email
        })
        .then(() => {
            return trx("users")
            .returning("*")
            .insert({
                username:   username,
                email:      email,
                hash:       hash,
                joined:     new Date()
            })
            .returning("id")
            .then(([user]) => user)
            .catch(() => { throw error.InternalServerError; });
        })
        .then(trx.commit)
        .catch(trx.rollback);  
    })
    .catch(() => { 
        throw error.InternalServerError; 
    });
};


const updateUser = async (id, username, email) => {
    return await 
    database("users")
    .where({ id: id })
    .update({
        username:   username,
        email:      email
    }, ["id", "username", "email", "entries", "joined"])
    .then(([user]) => user)
    .catch(() => { throw error.InternalServerError; });
}


const updateUserEntries = async (id) => {
    return await 
    database("users")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then(([{ entries }]) => JSON.stringify(entries))
    .catch(err => {
        // QUICK FIX - database query error returns object with n properties while not found return object without properties
        throw (Object.keys(err).length) ? error.InternalServerError : error.NotFoundError;
    });
}


const deleteUser = async (id) => {
    await 
    database("users")
    .where({ id: id })
    .first()
    .then(({ email }) => {
        database("login")
        .where({ email: email })
        .del()
        .returning("*")
        .catch(err => { throw (Object.keys(err).length) ? error.InternalServerError : error.NotFoundError; });  // QUICK FIX
    })
    .catch(err => { throw (Object.keys(err).length) ? error.InternalServerError : error.NotFoundError; });

    return await
    database("users")
    .where({ id: id })
    .del()
    .returning("id")
    .then(([id]) => id)
    .catch(err => { throw (Object.keys(err).length) ? error.InternalServerError : error.NotFoundError; });  // QUICK FIX
}


module.exports = {
    getUser,
    getUserList,
    createUser,
    updateUser,
    updateUserEntries,
    deleteUser
}
