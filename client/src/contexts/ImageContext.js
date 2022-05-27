import React, { createContext, useState } from 'react';


export const ImageContext = createContext(null);

const ImageContextProvider = ({ children }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [boxes, setBoxes] = useState([]);

    return (
        <ImageContext.Provider value={{}}>
            { children }
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;
