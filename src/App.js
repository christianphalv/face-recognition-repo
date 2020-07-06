import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import SignIn from './components/signIn/SignIn'
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Rank from './components/rank/Rank.js';
import Register from './components/register/Register';
import './App.css';
import Clarifai from 'clarifai';

const app =new Clarifai.App({
	apiKey: '983a3342aaf74fc78f635f4ad60dc661'
});

const particlesOptions = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

class App extends React.Component {
	
	constructor() {
		super();
		this.state = { 
			input: '',
			imageUrl: '',
			box: [],
			route: 'signin',
			isSignedIn: false,
		 }
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-perfect-beautiful-face-golden-ratio.jpg
// https://i.guim.co.uk/img/media/46d46c4d6fdba0b2c3f0fecb9d02c9088bb3fdc7/341_185_2430_1458/master/2430.jpg?width=700&quality=85&auto=format&fit=max&s=f4200c9f3c8f66420fa5fdbd08b2f8c2

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input })

		app.models
			.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render() {
		return (
			<div className="App">
				<Particles className="particles"
                params={particlesOptions} />
				<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
				{ this.state.route === 'home'
					? <div>
					<Logo />
					<Rank />
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
					<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
					</div>

					: (
						this.state.route === 'signin'
							? <SignIn onRouteChange={this.onRouteChange} />
							: <Register onRouteChange={this.onRouteChange} />
						)
				}
			</div>
		  );
	}
}

export default App;
