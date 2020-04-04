import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: 'https://samples.clarifai.com/face-det.jpg',
      boxs: [],
      route: 'signin',
      isSignedIn: false,
      user: undefined,
    }
  }

  loadUser = (user) => {
    this.setState({user: user});
  }

  onInputChange = (event) => {
    this.setState({imageUrl: event.target.value, boxs:[]});
  }

  onPictureSubmit = () => {
    fetch(process.env.REACT_APP_API_URL+'/clarifai', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.state.imageUrl
      }),
    }).then(async response => {
      const {regions, count} = await response.json();
      this.setState({ 
        boxs: regions
      });
      fetch(process.env.REACT_APP_API_URL+'/users/entries', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.user.id,
          entries: count,
        }),
      }).then(async response => {
        const total = await response.json();
        this.setState(Object.assign(this.state.user, {entries: total}));
      })
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({isSignedIn: route === 'home', route: route});
  }

  render() {
    return (
      <div className="tc">
        <Particles 
          className='particles' 
          params={particlesOptions}
          />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { (() => { 
            switch (this.state.route) {
              case 'signin':
                return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              case 'register':
                return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              default:
                return (
                  <div>
                    <Logo />
                    <Rank 
                      name={this.state.user.name} 
                      entries={this.state.user.entries} 
                      />
                    <ImageLinkForm 
                      defaultInput={this.state.imageUrl}
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onPictureSubmit}
                      />
                    <FaceRecognition 
                      sourceImage={this.state.imageUrl} 
                      boxs={this.state.boxs} 
                      />
                  </div>  
                )
            }
          })()
        }
      </div>
    );
  } 
}

export default App;
