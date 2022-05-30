
const signIn = (req, resp, database, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return resp.status(400).json("Incorrect form submission!");
    }
    
    database("login")
    .select("email", "hash")
    .where({ email: email })
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);

        if (isValid) {
            return database("users")
            .where("email", "=", email)
            .then(user => resp.json(user[0]))
            .catch(() => resp.status(400).json("Unable to get user information."));
        }

        resp.status(400).json("Wrong credentials.");
    })
    .catch(() => resp.status(400).json("Wrong credentials."));
};


module.exports = {
    signIn: signIn
};
