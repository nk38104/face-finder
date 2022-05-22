import React from 'react';


const Greeting = ({ username }) => {
    return (
        <div className="black f1">
            {`Welcome, ${username}!`}
        </div>
    );
}

export default Greeting;
