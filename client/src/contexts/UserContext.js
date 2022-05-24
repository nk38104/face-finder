import React, { createContext } from 'react';


export const UserContext = createContext();

const UserContextProvider = (props) => {
    return (
        <UserContextProvider>
        { props.children }
        </UserContextProvider>
    );
};

export default UserContextProvider;