import React, { Component } from 'react';
import Chat from './components/Chat';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Chat React - Firebase</h1>
        <Chat />
      </div>
    );
  }
}

export default App;
