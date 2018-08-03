import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search-bar/search-bar.js'

class App extends Component {
  render() {
    return (
      <div className="flex-col flex-center">
        <header className="flex-center">
          <h1 className="">Search for a Boardgame!</h1>
        </header>
        <div className="flex-center">
        <SearchBar />
        {/*
        </BoardGamePic>
        </boardgame-stats>
        </expansions>
          */}
        </div>
      </div>
    );
  }
}

export default App;
