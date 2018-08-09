import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search-bar/search-bar.js'
import BoardGames from './components/board-games/board-games.js'

class App extends Component {
  constructor(){
    super()
      this.state = {
        searchfield: ''
      }
    }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value})
    console.log(this.state.searchfield)
  }
  
  render() {
    return (
      <div className="flex-col flex-center">
        <header className="flex-center">
          <h1 className="">Search for a Boardgame!</h1>
        </header>
        <div className="flex-center">
        <SearchBar onSearchChange = {this.onSearchChange}/>
        <BoardGames searchStatus = {this.onSearchChange}/>
                {/*
        <boardgame-stats />
        < expansions />
          */}
        </div>
      </div>
    );
  }
}

export default App;
