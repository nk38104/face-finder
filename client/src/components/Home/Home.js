import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Greeting from './Greeting/Greeting';
import Image from './Image/Image';
import ImageContextProvider from '../../contexts/ImageContext';
import { UserContext } from '../../contexts/UserContext';


const Home = ({ baseURL }) => {
    const { isAuthenticated } = useContext(UserContext);
    
    return (isAuthenticated)
        ? (
            <div>
                <Logo />
                <Greeting />
                <ImageContextProvider>
                    <ImageLinkForm baseURL={baseURL} />
                    <Image />
                </ImageContextProvider>
            </div>
        ) 
        : <Navigate to="/signin" />;
};
 
export default Home;