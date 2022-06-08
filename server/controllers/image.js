const imageService  = require("../services/image");


const getFaceDetectionData = async (req, resp) => {
    try {
        const imageData = await imageService.getFaceDetectionData(req.body);
        resp.status(200).send(imageData);
    } catch (err) {
        resp.status(err.status).send(err.message);
    }
}


module.exports = {
    getFaceDetectionData: getFaceDetectionData
}
