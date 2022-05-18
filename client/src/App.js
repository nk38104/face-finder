import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const initialState = {
	input: 		"",
	imageUrl:	"",
	box: 		{},
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

  	calculateFaceLocation = (data) => {
    	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    	const image = document.getElementById("input-img");
    	const width = Number(image.width);
    	const height = Number(image.height);

   		return {
			leftCol:  	clarifaiFace.left_col * width,
      		topRow:		clarifaiFace.top_row * height,
      		rightCol:	width - (clarifaiFace.right_col * width),
	 		bottomRow:	height - (clarifaiFace.bottom_row * height) + 50,
    	}	
  	}

	onRouteChange = (route) => {
		if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		
		if (route === "signout") {
			this.setState(initialState);
		}

		this.setState({ route: route });
	}

	displayFaceBox = (box) => {
		this.setState({ box: box });
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

  	onImageSubmit  = () => {
    	this.setState({ imageUrl: this.state.input });

		fetch(`${baseURL}/image-detect`, {
			method: "post",
			headers:{"Content-Type": "application/json"},
			body:   JSON.stringify({
						input:	this.state.input
					})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				fetch(`${baseURL}/image`, {
					method: "put",
					headers:{"Content-Type": "application/json"},
					body:   JSON.stringify({
								id:	this.state.user.id
							})
				})
				.then(response => response.json())
				.then(count => { this.setState(Object.assign(this.state.user, { entries: count })) })
				.catch(err => console.log(err));
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		}).catch(err => console.log(err));
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		
		return (
			<div className="App">
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{
					(route === "home")
					?	<div>
							<Logo />
							<Rank username={this.state.user.username} entries={this.state.user.entries} />
							<ImageLinkForm	 onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
							<FaceRecognition imageUrl={imageUrl} box={box} />
						</div>
					: 	((route === "signin")
							? <SignIn	loadUser={this.loadUser} onRouteChange={this.onRouteChange} baseURL={this.state.baseURL}/>
							: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} baseURL={this.state.baseURL}/>
						)
				}
			</div>
		);
	}
}

export default App;
