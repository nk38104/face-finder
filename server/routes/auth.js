const express = require("express");
const authController = require("../controllers/auth");


const router = express.Router();

router.post("/api/register", (req, resp) => { authController.register(req, resp) });
router.post("/api/signin", (req, resp) => { authController.signIn(req, resp) });


module.exports = {
    router
}
