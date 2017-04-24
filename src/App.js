import React, { Component } from 'react';
import Navigation from './components/navigation';
import Content from './components/content';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Content/>
      </div>
    );
  }
}

export default App;
