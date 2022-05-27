import React, { createContext, useState } from 'react';


export const ImageContext = createContext(null);

const ImageContextProvider = ({ children }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [boxes, setBoxes] = useState([]);

	const calculateFaceLocations = (data) => {
		const clarifaiFaceRegions = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
		const image = document.getElementById("input-img");
		const [width, height] =  [Number(image.width), Number(image.height)];

		return clarifaiFaceRegions.map(faceRegion => {
			return {
				leftCol:  	faceRegion.left_col * width,
				topRow:		faceRegion.top_row * height,
				rightCol:	width - (faceRegion.right_col * width),
				bottomRow:	height - (faceRegion.bottom_row * height) + 50
			}
		});
  	}

	const setFaceBoxes = (faceBoxes) => {
		setBoxes(calculateFaceLocations(faceBoxes));
	}

    return (
        <ImageContext.Provider value={{ imageUrl, setImageUrl, boxes, setFaceBoxes }}>
            { children }
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;
