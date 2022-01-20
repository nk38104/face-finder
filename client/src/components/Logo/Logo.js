import React from 'react';
import Tilt from 'react-parallax-tilt';
import logoImage from './logo_image.svg';
import './Logo.css';


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="tilt br2 shadow-2" options={{ max: 40 }}>
                <div className="tilt-inner pa3">
                    <img className="logo-img" alt="logo" src={logoImage}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
