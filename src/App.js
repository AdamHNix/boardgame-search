import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search-bar/search-bar.js'
import BoardGameImage from './components/BoardGameImage/boardGameImage.js'
import xml2js from 'xml2js'

const parseString = xml2js.parseString;
class App extends Component {
  constructor(){
    super()
      this.state = {
        searchfield: '',
        games: [],
        gameImage: ''
      }
    }
    onButtonSubmit = (event) => {
      let searchValue = this.state.searchfield
      this.setState({search: searchValue});
      console.log(searchValue)
     fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchValue}`)
     .then(response => response.text())
     //convert xml to JSON
     .then(data =>
      {
        let jsonData = parseString(data, (err, result) => {
         if (err){
             console.log("ERROR converting XML!");
         }
         (JSON.stringify(result));
         console.log(result)
        let games = []
        let i = 0;
        Object.values(result.items.item).forEach(game => {
          games.push(
            { id:game.$.id,
              name: game.name[0].$.value,
              image: ''
            }
          )
          i++
          if (i>5){
            return;
          }
        }
        );
        Object.values(games).map(obj =>
          fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${obj.id}`)
          .then(response => response.text())
          .then(imageData =>
           {
             parseString(imageData, (err, result) => {
              if (err){
                  console.log("ERROR converting XML!");
              }
              (JSON.stringify(result));
              console.dir(result);
              let getPic = (result.items.item[0].image[0])
              obj.image = getPic;
              })
              this.setState({games: games})
              console.log(this.state.games)
            }
           )
          )
      return jsonData;
        })})}

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
        <SearchBar onSearchChange = {this.onSearchChange} onButtonSubmit = {this.onButtonSubmit}/>
        <BoardGameImage  className = "flex-center" games = {this.state.games}/>
         {/*
        <boardgame-stats />
        <expansions />
          */}
        </div>
      </div>
    );
  }
}

export default App;
