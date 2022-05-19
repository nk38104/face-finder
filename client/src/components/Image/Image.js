import React from 'react';
import FaceBox from './FaceBox/FaceBox';


const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma1">
            <div className="absolute mt2">
                <img id="input-img" className="mb5 br1" src={imageUrl} alt="" width="500px" height="auto" />
                {
                    boxes.map(box => {
                        return <FaceBox box={box} />;
                    })
                }
            </div>
        </div>
    );
}

export default FaceRecognition;
