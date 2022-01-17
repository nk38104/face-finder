
const handleProfileGet = (req, resp, database) => {
    const { id } = req.params;

    database.select("*").from("users").where( { id: id })
    .then(user => {
        if (user.length) {
            resp.json(user[0])
        } else {
            resp.status(400).json("Not found");
        }
    });
};

module.exports = {
    handleProfileGet: handleProfileGet
}
