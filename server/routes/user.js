const express = require("express");
const userController = require("../controllers/user.js");


const router = express.Router();

router.get('/api/users', (req, resp) => { userController.getUsers(req, resp) });
router.get("/api/user/:id", (req, resp) => { userController.getUser(req, resp) });
router.delete("/api/user/:id", (req, resp) => { userController.deleteUser(req, resp) });
router.put("/api/user", (req, resp) => { userController.updateUser(req, resp) });
router.put("/api/user/increment/:id", (req, resp) => { userController.updateUserIncrement(req, resp) });


module.exports = {
    router
}
