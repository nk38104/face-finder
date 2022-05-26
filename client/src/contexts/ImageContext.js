import React, { createContext } from "react";


export const ImageContext = createContext(null);

const ImageContextProvider = ({ children }) => {
    return(
        <ImageContext.Provider value={{}}>
            { children }
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;
