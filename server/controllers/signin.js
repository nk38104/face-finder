
const handleSignIn = (req, resp, database, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return resp.status(400).json("Incorrect form submission!");
    }
    
    database.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);

        if (isValid) {
            return database.select("*")
            .from("users")
            .where("email", "=", email)
            .then(user => {
                resp.json(user[0]);
            })
            .catch(() => resp.status(400).json("Unable to get user info."));
        } else {
            resp.status(400).json("Wrong credentials.");
        }
    })
    .catch(() => resp.status(400).json("Wrong credentials."));
};

module.exports = {
    handleSignIn: handleSignIn
}
