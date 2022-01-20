const Clarifai  = require('clarifai');
const config    = require('../config/config');


const clarifai = new Clarifai.App({
	apiKey: config.CLARIFAI_KEY,
});

const handleFaceDetectionAPICall = (req, resp) => {
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { resp.json(data) })
    .catch(err => resp.status(400).json("Unable to work with face detection API!"));
}

const handleImage = (req, resp, database) => {
    const { id } = req.body;
    
    database("users").where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        resp.json(entries[0]);
    })
    .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
};

module.exports = {
    handleImage: handleImage,
    handleFaceDetectionAPICall: handleFaceDetectionAPICall
}
