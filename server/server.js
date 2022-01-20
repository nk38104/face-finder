const express   = require("express");
const bcrypt    = require('bcryptjs');
const cors      = require("cors");
const knex      = require("knex");
const path      = require("path");
const register  = require("./controllers/resgister");
const signin    = require("./controllers/signin");
const profile   = require("./controllers/profile");
const image     = require("./controllers/image");
const config    = require('./config/config');
const db_config = require('./config/db_config');


// Database connection configuration
const database = knex(db_config.config);

/*
    -------------
    - ENDPOINTS -
    -------------
    /                   --> resp with home page
    /signin             --> POST, resp with succes||fail
    /register           --> POST, new user
    /profile/:userID    --> GET, resp with user page
    /image              --> PUT, resp with updated user
*/

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => { resp.send(database.select("*").from("users")) });

app.post("/signin", (req, resp) => { signin.handleSignIn(req, resp, database, bcrypt) });

app.post("/register", (req, resp) => { register.handleRegister(req, resp, database, bcrypt) });

app.get("/profile/:id", (req, resp) => { profile.handleProfileGet(req, resp, database) });

app.put("/image", (req, resp) => { image.handleImage(req, resp, database) });
app.post("/image-detect", (req, resp) => { image.handleFaceDetectionAPICall(req, resp) });

// -------- deployment --------

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, resp) => resp.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}
// -------- deployment --------

app.listen(config.PORT || 5000, () => {
    console.log(`App is running on port ${config.PORT}.`);
});
