
const handleRegister = (req, resp, database, bcrypt) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return resp.status(400).json("Incorrect form submission!");
    }

    var hash = bcrypt.hashSync(password, 10);
    
    database.transaction(trx => {
        trx.insert({
            hash:   hash,
            email:  email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
            return trx("users").returning("*")
            .insert({
                username:   username,
                email:      loginEmail[0],
                joined:     new Date()
            })
            .then(user => { resp.json(user) })
        })
        .then(trx.commit)
        .catch(trx.rollback);  
    }).catch(() => resp.status(400).json("Unable to register."));;
};

module.exports = {
    handleRegister: handleRegister
}
