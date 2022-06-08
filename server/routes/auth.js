const express = require("express");
const authController = require("../controllers/auth");


const router = express.Router();

router.post("/register", (req, resp) => { authController.register(req, resp) });
router.post("/signin", (req, resp) => { authController.signIn(req, resp) });


module.exports = {
    router
}
