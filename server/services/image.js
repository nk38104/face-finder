const error     = require("../errors/errors");
const Clarifai  = require('clarifai');
require('dotenv').config();


const getFaceDetectionData = async (imageDTO) => {
    const { imageUrl } = imageDTO;
    const clarifai = new Clarifai.App({
        apiKey: process.env.CLARIFAI_KEY,
    });

    if(!imageUrl) {
        throw error.InvalidRequestError;
    }
    
    return await 
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
    .then(data => data)
    .catch(() => { throw error.FaceDetectionApiError; });
}


module.exports = {
    getFaceDetectionData
}
