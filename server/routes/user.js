const express = require("express");
const userController = require("../controllers/user.js");


const router = express.Router();

router.get('/users', (req, resp) => { userController.getUsers(req, resp) });
router.get("/user/:id", (req, resp) => { userController.getUser(req, resp) });
router.delete("/user/:id", (req, resp) => { userController.deleteUser(req, resp) });
router.put("/user", (req, resp) => { userController.updateUser(req, resp) });
router.put("/user/increment/:id", (req, resp) => { userController.updateUserIncrement(req, resp) });


module.exports = {
    router
}
