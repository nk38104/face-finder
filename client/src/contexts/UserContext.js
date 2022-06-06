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

	const updateUser = async (newUsername, newEmail, baseURL) => {
		await fetch(`${baseURL}/users/edit/${user.id}`, {
			method: "put",
			body:	JSON.stringify({
				username:	newUsername,
				email:		newEmail
			}),
			headers:{"Content-Type": "application/json"},
		})
		.then(response => response.json())
		.then(user => setUser(user))
		.catch(err => console.log(err));
	}

	const incrementEntries = async (baseURL) => {
		await fetch(`${baseURL}/users/${user.id}`, {
			method: "put",
			headers:{"Content-Type": "application/json"},
		})
		.then(response => response.json())
		.then(count => { setUser({ ...user, entries: count })})
		.catch(err => console.log(err));
	}

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser, incrementEntries, isAuthenticated: user.isLogged }}>
        { children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;
