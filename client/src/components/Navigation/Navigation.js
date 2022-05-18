import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange("signin")} className="f3 b link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }
    return (<></>)
}

export default Navigation;
