const express   = require("express");
const cors      = require("cors");
const path      = require("path");
const userRouter    = require("./routes/user");
const authRouter    = require("./routes/auth");
const imageRouter   = require("./routes/image");


const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter.router);
app.use(authRouter.router);
app.use(imageRouter.router);


// -------- DEPLOYMENT --------
if (process.env.NODE_ENV === "production") {
    // app.use(express.static("client/build"));
    app.use(express.static(path.resolve(__dirname + "../client/build")));
    app.get(/.*/, (req, resp) => resp.sendFile(path.resolve(__dirname, "../client/build/index.html")));
}
// ----------------------------

/*
    -------------
    - ENDPOINTS -
    -------------
    /users              --> GET, resp with all users
    /user/:id           --> GET, resp with user data
    /user/:id           --> PUT, resp with updated user data
    /user/increment/:id --> PUT, resp with updated user image detection count
    /user/:id           --> DELETE, resp with deleted user id
    /signin             --> POST, resp with user data
    /register           --> POST, resp with created user data
    /face-detection     --> POST, resp with face detection data
*/

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}.`);
});
