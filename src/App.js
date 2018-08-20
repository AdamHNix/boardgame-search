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
          if (err) {
            console.log("ERROR converting XML!");
          }
          JSON.stringify(result);
          console.log("result 1", result);
          //sets object to array of lower compoents (items)
          result = Object.values(result.items.item).filter(gametype => {
            return gametype.$.type === "boardgame";
          });
          console.log("result 2", result);
          let games = [];
          console.log("total games", result.length);
          // loops through first 10 or less games that come up in fetch
          for (let game = 0; game <= 20 && game < result.length; game++) {
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
          Object.values(games).map(obj =>
            fetch(
              `https://boardgamegeek.com/xmlapi2/thing?id=${obj.id}&stats=1`
            )
              .then(response => response.text())
              .then(imageData => {
                parseString(imageData, (err, result) => {
                  if (err) {
                    console.log("ERROR converting XML!");
                  }
                  JSON.stringify(result);
                  console.dir(result);
                  // if((result.items.item[0].$.type) !== "boardgame"){
                  //   console.log(result.items.item[0].$.type)
                  //   return games
                  // }
                  // else{
                  console.log(result);
                  //result = Object.values(result).sort(())
                  let getPic = result.items.item[0].image[0];
                  obj.image = getPic;
                  // }
                });
                this.setState({ games: games });
                console.log(games);
              })
          );
          // not sure where to put this --
          // games = games.filter(game => {
          // return game.image.length > 0;
          // })
          return jsonData;
        });
      });
  };
  //tracks what is in searchbox
  onSearchChange() {
    this.setState({ searchfield: event.target.value });
  }
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
