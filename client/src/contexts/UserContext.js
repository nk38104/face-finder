import React, { useState, createContext } from 'react';


export const UserContext = createContext(null);

const initialUserState = {
	user: {
		id:         "",
		username:   "",
		email:      "",
		entries:    0,
		joined:     "",
		isLogged:	false
	}
}

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(initialUserState);

	const login = (userData) => {
		setUser({ ...userData, isLogged: true });
	}

	const logout = () => {
		setUser(initialUserState);
	}

    return (
        <UserContext.Provider value={{ user, login, logout }}>
        { children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;
