import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';


const Navigation = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(UserContext);

    const signout = () => {
        logout();
        navigate("/signin");
    }

    if (isAuthenticated) {
        return (
            <nav className="flex justify-end">
                <Link to="/" className="f3 b link dim black underline pa3 pointer">Home</Link>
                <Link to="user-profile" className="f3 b link dim black underline pa3 pointer">Profile</Link>
                <Link to="/signin" onClick={signout} className="f3 b link dim black underline pa3 pointer">Sign Out</Link>
            </nav>
        );
    }
    
    return (<div className="mt6"></div>);
}

export default Navigation;
