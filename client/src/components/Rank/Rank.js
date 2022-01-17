import React from 'react';


const Rank = ({ username, entries }) => {
    return (
        <div>
            <div className="black f3">
                {`${username}, your current entry count is...`}
            </div>
            <div className="black f1">
                {`#${entries}`}
            </div>
        </div>
    );
}

export default Rank;
