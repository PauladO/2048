import React, { Component } from 'react';
import './App.css';
import Title from './components/Title/Title'
import Board from './components/Board/Board'

class App extends Component {
  render() {
    return (
      <div>
        <Title content="2048" />
        <div className="BoardWrapper">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
