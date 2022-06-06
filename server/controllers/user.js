
const getUsers = (req, resp, database) => {
    database("users").then(data => resp.send(data));
};

const getUser = (req, resp, database) => {
    const { id } = req.params;
    console.log("inside");

    database("users")
    .where({ id: id })
    .then(user => {
        console.log("user: ", user);
        if (user.length) {
            resp.json(user[0])
        } else {
            resp.status(400).json("Not found.");
        }
    });
};

const updateUser = (req, resp, database) => {
    const { id } = req.params;
    
    database("users")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then(([{ entries }]) => {
        resp.json(entries);
    })
    .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
};

const deleteUser = (req, resp, database) => {
    const { id } = req.params;

    database("users")
    .where({ id: id })
    .first()
    .then(user => {
        database("login")
        .where({ email: user.email })
        .del()
        .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
    });

    database("users")
    .where({ id: id })
    .del()
    .then(() => resp.status(200).json("User deleted successfully"))
    .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
};

module.exports = {
    getUsers:   getUsers,
    getUser:    getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
