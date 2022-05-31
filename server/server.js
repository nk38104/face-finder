const express   = require("express");
const bcrypt    = require('bcryptjs');
const cors      = require("cors");
const knex      = require("knex");
const path      = require("path");
const config    = require('./config/config');
const db_config = require('./config/db_config');
const userController      = require("./controllers/user");
const registerController  = require("./controllers/register");
const signinController    = require("./controllers/signin");
const imageController     = require("./controllers/image");


const database = knex(db_config.config);

const app = express();
app.use(express.json());
app.use(cors());

// -------- DEPLOYMENT --------
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, resp) => resp.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}
// ----------------------------

/*
    -------------
    - ENDPOINTS -
    -------------
    /users              --> GET, resp with all users
    /users/:id          --> GET, resp with user info
    /users/:id          --> PUT, resp with updated user image detection count
    /users/:id          --> DELETE, resp with succes || fail
    /signin             --> POST, resp with user info
    /register           --> POST, resp with created user info
    /image-detect       --> POST, resp with face detection data
*/

app.get('/users', (req, resp) => { userController.getUsers(req, resp, database) });
app.get("/users/:id", (req, resp) => { userController.getUser(req, resp, database) });
app.put("/users/:id", (req, resp) => { userController.updateUser(req, resp, database) });
app.delete("/users/:id", (req, resp) => { userController.deleteUser(req, resp, database) });
app.put("/users/edit/:id", (req, resp) => { userController.editUser(req, resp, database) });
    
app.post("/signin", (req, resp) => { signinController.signIn(req, resp, database, bcrypt) });

app.post("/register", (req, resp) => { registerController.register(req, resp, database, bcrypt) });

app.post("/image-detect", (req, resp) => { imageController.getFaceDetectionData(req, resp) });


app.listen(config.PORT || 3000, () => {
    console.log(`App is running on port ${config.PORT}.`);
});
