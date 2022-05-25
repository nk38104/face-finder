import React, { createContext } from 'react';


export const UserContext = createContext();

const UserContextProvider = (props) => {
    return (
        <UserContext.Provider>
        { props.children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;