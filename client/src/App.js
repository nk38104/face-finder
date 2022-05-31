import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';
import UserContextProvider from './contexts/UserContext';


const App = () => {
	const baseURL = (process.env.NODE_ENV === "production") ? "https://face-finder-web-app.herokuapp.com" : "http://localhost:3000";

	return (
		<div className="App">
			<UserContextProvider>
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route exect path="/" element={ <Home baseURL={baseURL} /> } />
					<Route exect path="/signin" element={ <SignIn baseURL={baseURL} /> } />
					<Route exect path="/register" element={ <Register baseURL={baseURL} /> } />
					<Route exect path="/user-profile" element={ <UserProfile baseURL={baseURL} /> } />
					<Route exect path="/edit-profile" element={ <EditProfile baseURL={baseURL} /> } />
				</Routes>
			</BrowserRouter>
			</UserContextProvider>
		</div>
	);
}

export default App;
