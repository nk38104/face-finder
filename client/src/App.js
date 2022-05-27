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
	const [isLogged, setLogged] = useState(false);
	const [input, setInput] = useState("");
	const [route, setRoute] = useState("signin");
	const [user, setUser] = useState(initUser);
	const [imageUrl, setImageUrl] = useState("");
	const [boxes, setBoxes] = useState([]);
	const baseURL = (process.env.NODE_ENV === "production") ? "https://face-finder-web-app.herokuapp.com" : "http://localhost:3000";

	const logout = () => {
		setRoute("signin");
		setLogged(false);
		setInput("");
		setUser(initUser);
		setImageUrl("");
		setBoxes([]);
	}

	const loadUser = (userData) => {
		setUser(userData);
	}

	const onRouteChange = (nextRoute) => {
		setRoute(nextRoute);

		if (nextRoute === "home") {
			setLogged(true);
		}

		if (nextRoute === "signout") {
			logout();
		}
	}

	const calculateFaceLocations = (data) => {
		const clarifaiFaceRegions = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
		const image = document.getElementById("input-img");
		const [width, height] =  [Number(image.width), Number(image.height)];

		return clarifaiFaceRegions.map(faceRegion => {
			return {
				leftCol:  	faceRegion.left_col * width,
				topRow:		faceRegion.top_row * height,
				rightCol:	width - (faceRegion.right_col * width),
				bottomRow:	height - (faceRegion.bottom_row * height) + 50
			}
		});
  	}

	const setFaceBoxes = (faceBoxes) => {
		setBoxes(faceBoxes);
	}

	const onInputChange = (event) => {
		setInput(event.target.value);		
	}

  	const onImageSubmit  = () => {
		setImageUrl(input);

		fetch(`${baseURL}/image-detect`, {
			method: "post",
			headers:{"Content-Type": "application/json"},
			body:   JSON.stringify({
						imageUrl:	input
					})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				fetch(`${baseURL}/users/${user.id}`, {
					method: "put",
					headers:{"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(count => { setUser({ ...user, entries: count })})
				.catch(err => console.log(err));
			}
			setFaceBoxes(calculateFaceLocations(response));
		}).catch(err => console.log(err));
	}

	return (
		<div className="App">
			<Navigation onRouteChange={onRouteChange} isLogged={isLogged}/>
			<UserContextProvider>
			{	
				(route === "home")
				?	<Home
						onInputChange={onInputChange}
						onImageSubmit={onImageSubmit}
						imageUrl={imageUrl}
						boxes={boxes}
					/>
				: 	(route === "signin")
						? <SignIn onRouteChange={onRouteChange} baseURL={baseURL}/>
						: (route === "profile")
							? <UserProfile onRouteChange={onRouteChange} userData={user} baseURL={baseURL} />
							: <Register loadUser={loadUser} onRouteChange={onRouteChange} baseURL={baseURL}/>					
		}
			</UserContextProvider>
		</div>
	);
}

export default App;
