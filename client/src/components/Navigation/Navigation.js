import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange("home")} className="f3 b link dim black underline pa3 pointer">Home</p>
                <p onClick={() => onRouteChange("profile")} className="f3 b link dim black underline pa3 pointer">User Profile</p>
                <p onClick={() => onRouteChange("signout")} className="f3 b link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }
    return (<div className="mt6"></div>)
}

export default Navigation;
