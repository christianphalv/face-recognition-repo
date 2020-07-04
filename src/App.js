import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Rank from './components/rank/Rank.js';
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
		 }
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-perfect-beautiful-face-golden-ratio.jpg

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input })

		app.models
		.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
		.then(
			function(response) {
				console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
			},
			function(err) {

			}
		)
	}

	render() {
		return (
			<div className="App">
				<Particles className="particles"
                params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		  );
	}
}

export default App;
