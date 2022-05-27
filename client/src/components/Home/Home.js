import React from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Greeting from './Greeting/Greeting';
import Image from './Image/Image';
import ImageContextProvider from '../../contexts/ImageContext';


const Home = ({ baseURL }) => {
    return (
        <div>
            <ImageContextProvider>
                <Logo />
                <Greeting />
                <ImageLinkForm baseURL={baseURL} />
                <Image />
            </ImageContextProvider>
        </div>
    );
};
 
export default Home;