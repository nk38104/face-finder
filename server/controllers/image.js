const Clarifai  = require('clarifai');
const config    = require('../config/config');


const clarifai = new Clarifai.App({
	apiKey: config.CLARIFAI_KEY,
});

const getFaceDetectionData = (req, resp) => {
    const { imageURL } = req.body;

    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, imageURL)
    .then(data => { resp.json(data) })
    .catch(err => resp.status(400).json(`Unable to work with face detection API!\n${err}`));
}

module.exports = {
    getFaceDetectionData: getFaceDetectionData
}
