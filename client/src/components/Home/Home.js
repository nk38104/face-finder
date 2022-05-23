import React from 'react';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Greeting from './Greeting/Greeting';
import Image from './Image/Image';


const Home = ({ username, onInputChange, onImageSubmit, imageUrl, boxes }) => {
    return (
        <div>
            <Logo />
            <Greeting username={username} />
            <ImageLinkForm onInputChange={onInputChange} onImageSubmit={onImageSubmit} />
            <Image imageUrl={imageUrl} boxes={boxes} />
        </div>
    );
};
 
export default Home;