import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';


const Greeting = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="black f1">
            {`Welcome, ${user.username}!`}
        </div>
    );
}

export default Greeting;
