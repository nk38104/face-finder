import React, { useContext } from 'react';
import { ImageContext } from '../../../contexts/ImageContext';
import FaceBox from './FaceBox/FaceBox';


const Image = () => {
    const { imageUrl, boxes } = useContext(ImageContext);
    
    return (
        <div className="center ma1">
            <div className="absolute mt2">
                <img id="input-img" className="mb5 br1" src={imageUrl} alt="" width="500px" height="auto" />
                {
                    boxes.map((box, index) => {
                        return <FaceBox key={index} box={box} />;
                    })
                }
            </div>
        </div>
    );
}

export default Image;
