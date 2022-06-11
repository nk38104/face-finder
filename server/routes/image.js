const express = require("express");
const imageController = require("../controllers/image");


const router = express.Router();

router.post("/api/face-detection", (req, resp) => { imageController.getFaceDetectionData(req, resp) });


module.exports = {
    router
}
