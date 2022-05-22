import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Greeting from './components/Greeting/Greeting';
import Image from './components/Image/Image';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';


const initialState = {
	input: 		"",
	imageUrl:	"",
	boxes:		[],
	route:		"signin",
	isSignedIn:	false,
	user: {
		id:         "",
		username:   "",
		email:      "",
		entries:    0,
		joined:     "",
	},
	baseURL: (process.env.NODE_ENV === "production") ? "https://face-finder-web-app.herokuapp.com" : "http://localhost:3000"
}

class App extends Component {
  	constructor() {
    	super();
		this.state = initialState;
    	
  	}

	loadUser = (userData) => {
		this.setState({ user: {
			id:         userData.id,
			username:   userData.username,
			email:      userData.email,
			entries:    userData.entries,
			joined:     userData.joined,
		}});
	}

	onRouteChange = (route) => {
		if (route === "home") {
			this.setState({ isSignedIn: true });
		}

		if (route === "signout") {
			route = "signin";
			this.setState(initialState);
		}

		this.setState({ route: route });
	}

	calculateFaceLocations = (data) => {
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

	setFaceBoxes = (faceBoxes) => {
		this.setState({ boxes: faceBoxes });
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

  	onImageSubmit  = () => {
    	this.setState({ imageUrl: this.state.input });

		fetch(`${this.state.baseURL}/image-detect`, {
			method: "post",
			headers:{"Content-Type": "application/json"},
			body:   JSON.stringify({
						imageURL:	this.state.input
					})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				fetch(`${this.state.baseURL}/users/${this.state.user.id}`, {
					method: "put",
					headers:{"Content-Type": "application/json"},
				})
				.then(response => response.json())
				.then(count => { this.setState(Object.assign(this.state.user, { entries: count } ))})
				.catch(err => console.log(err));
			}
			this.setFaceBoxes(this.calculateFaceLocations(response))
		}).catch(err => console.log(err));
	}

	render() {
		const { isSignedIn, imageUrl, route, boxes } = this.state;
		
		return (
			<div className="App">
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{
					(route === "home")
					?	<div>
							<Logo />
							<Greeting username={this.state.user.username} />
							<ImageLinkForm	 onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
							<Image imageUrl={imageUrl} boxes={boxes} />
						</div>
					: 	(route === "signin")
							? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} baseURL={this.state.baseURL}/>
							: (route === "profile")
								?	<div>
										<Logo />
										<UserProfile onRouteChange={this.onRouteChange} userData={this.state.user} baseURL={this.state.baseURL} />
									</div>
								: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} baseURL={this.state.baseURL}/>
						
				}
			</div>
		);
	}
}

export default App;
