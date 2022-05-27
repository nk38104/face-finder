import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import UserContextProvider from './contexts/UserContext';


const initUser = {
	id:         "",
	username:   "",
	email:      "",
	entries:    0,
	joined:     ""
}

const App = () => {
	const [route, setRoute] = useState("signin");
	const baseURL = (process.env.NODE_ENV === "production") ? "https://face-finder-web-app.herokuapp.com" : "http://localhost:3000";

	const onRouteChange = (nextRoute) => {
		setRoute(nextRoute);

		if (nextRoute === "home") {
			setLogged(true);
		}

		if (nextRoute === "signout") {
			logout();
		}
	}

	return (
		<div className="App">
			<UserContextProvider>
			<Navigation onRouteChange={onRouteChange} />
			{	
				(route === "home")
				?	<Home baseURL={baseURL} />
				: 	(route === "signin")
						? <SignIn onRouteChange={onRouteChange} baseURL={baseURL} />
						: (route === "profile")
							? <UserProfile onRouteChange={onRouteChange} baseURL={baseURL} />
							: <Register onRouteChange={onRouteChange} baseURL={baseURL} />
		}
			</UserContextProvider>
		</div>
	);
}

export default App;
