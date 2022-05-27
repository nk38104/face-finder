import React, { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { ImageContext } from '../../../contexts/ImageContext';
import './ImageLinkForm.css';


const ImageLinkForm = ({ baseURL }) => {
    const [input, setInput] = useState("");
    const { incrementEntries } = useContext(UserContext);
    const { setImageUrl, setFaceBoxes } = useContext(ImageContext);

    const onInputChange = (event) => {
		setInput(event.target.value);		
	}
    
    const onImageSubmit  = () => {
		setImageUrl(input);

		fetch(`${baseURL}/image-detect`, {
			method: "post",
			headers:{"Content-Type": "application/json"},
			body:   JSON.stringify({
						imageUrl:	input
					})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				incrementEntries(baseURL);
			}
			setFaceBoxes(response);
		}).catch(err => console.log(err));
	}

    return (
        <div>
            <p className="f3">
                {'The SmartBrain will detect faces in your images. Give it a try.'}
            </p>
            <div className="center">
                <div className="form center pa4 br2 shadow-5 bg-lightest-blue">
                    <input onChange={onInputChange} className="f4 pa2 w-70 center br2 br--left" type="text" />
                    <button onClick={onImageSubmit} className="f4 w-30 black link ph3 pv2 dib br2 br--right">Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
