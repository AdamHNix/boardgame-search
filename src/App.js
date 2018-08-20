import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/search-bar/search-bar.js";
import BoardGameImage from "./components/BoardGameImage/boardGameImage.js";
import xml2js from "xml2js";

const parseString = xml2js.parseString;
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: "",
      games: []
    };
  }
  onButtonSubmit = () => {
    let searchValue = this.state.searchfield;
    this.setState({ search: searchValue });
    console.log(searchValue);
    let link = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchValue}`;
    if (searchValue.startsWith('"') && searchValue.endsWith('"')) {
      console.log("exact Search");
      searchValue = searchValue.replace(/["]/g, "");
      link = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchValue}&exact=1`;
      console.log(link);
    }
    fetch(link)
      .then(response => response.text())
      //convert xml to JSON
      .then(data => {
        let jsonData = parseString(data, (err, result) => {
          let games = [];
          if (err) {
            console.log("ERROR converting XML!");
          }
          JSON.stringify(result);
          //sets object to array of lower compoents (items)
          if (result.items.$.total === "0") {
            games = ["Sorry, I couldn't find anything..."];
            this.setState({ games: games });
            return true;
          }
          result = Object.values(result.items.item).filter(gametype => {
            return gametype.$.type === "boardgame";
          });
          console.log("total games", result.length);
          // loops through first 10 or less games that come up in fetch
          for (let game = 0; game < 50 && game < result.length; game++) {
            let gameObj = Object.values(result[game]);
            console.log("game object", gameObj);
            console.log("current game", game);
            console.log("full game array", games);
            console.log("next");
            games.push({
              id: gameObj[0].id,
              name: gameObj[1][0].$.value,
              image: ""
            });
            console.log("Finished push");
          }
          //second fetch to obtain all stats on each boardgame
          games = Object.values(games).map(obj => (obj = obj.id));
          console.log(games);
          let stringGames = games.join(",");
          console.log(stringGames);
          fetch(
            `https://boardgamegeek.com/xmlapi2/thing?id=${stringGames}&stats=1`
          )
            .then(response => response.text())
            .then(data => {
              parseString(data, (err, result) => {
                if (err) {
                  console.log("ERROR converting XML!");
                }
                JSON.stringify(result);
                console.log(result);
                games = Object.values(result.items.item).map(game => {
                  let type = game.$.type;
                  if (type !== "boardgame") {
                    return (game = null);
                  }
                  return game;
                });
                games = Object.values(games).sort((a, b) => {
                  if (a === null) {
                    return true;
                  }
                  if (b === null) {
                    return true;
                  }
                  let aPop = a.statistics[0].ratings[0].usersrated[0].$.value;
                  let bPop = b.statistics[0].ratings[0].usersrated[0].$.value;
                  return bPop - aPop;
                });
                console.log(games);
              });
              this.setState({ games: games });
              console.log(games);
            });
          return jsonData;
        });
      });
  };
  //tracks what is in searchbox
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    return (
      <div className="flex-center">
        <header className="flex-center">
          <h1>Search for a Boardgame!</h1>
        </header>
        <div className="flex-center">
          <SearchBar
            className="flex-center"
            onSearchChange={this.onSearchChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <BoardGameImage className="flex-center" games={this.state.games} />
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
