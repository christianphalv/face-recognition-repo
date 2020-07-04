import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank.js';
import './App.css';

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
	render() {
		return (
			<div className="App">
				<Particles className="particles"
                params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm />
				{/*
				<ImageLinkForm />
				<FaceRecognition />*/}
			</div>
		  );
	}
}

export default App;
