import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const Navigation = ({ onRouteChange }) => {
    const { user, logout } = useContext(UserContext);

    const signout = () => {
        logout();
        onRouteChange("signout");
    }

    if (user.isLogged) {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange("home")} className="f3 b link dim black underline pa3 pointer">Home</p>
                <p onClick={() => onRouteChange("profile")} className="f3 b link dim black underline pa3 pointer">User Profile</p>
                <p onClick={signout} className="f3 b link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }
    
    return (<div className="mt6"></div>);
}

export default Navigation;
