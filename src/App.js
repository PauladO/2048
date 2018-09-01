import React, { Component } from 'react';
import './App.css';
import Title from './components/Title'
import Board from './components/Board'

class App extends Component {
  render() {
    return (
      <div>
        <Title content="2048" />
        <div class="BoardWrapper">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
