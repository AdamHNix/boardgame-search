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
    // let proxyURL = "https://crossorigin.me/";
    let link = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchValue}`;
    if (searchValue.startsWith('"') && searchValue.endsWith('"')) {
      searchValue = searchValue.replace(/["]/g, "");
      link = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchValue}&exact=1`;
    }
    fetch(link)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.text();
      })
      //convert xml to JSON
      .then(data => {
        let jsonData = parseString(data, (err, result) => {
          let games = [];
          console.log("HELLO");
          if (err) {
            games = ["ERROR: Could not parse BGG XML to JSON"];
            this.setState({ games: games });
            return true;
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
          // loops through first 50 or less games that come up in fetch
          for (let game = 0; game < 50 && game < result.length; game++) {
            let gameObj = Object.values(result[game]);
            //pushes each game id and name into games array
            games.push({
              id: gameObj[0].id,
              name: gameObj[1][0].$.value,
              image: ""
            });
          }
          //second fetch to obtain all stats on each boardgame
          games = Object.values(games).map(obj => (obj = obj.id));
          let stringGames = games.join(",");
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
                  //marks all non-boardgames as null
                  if (type !== "boardgame") {
                    return (game = null);
                  }
                  return game;
                });
                //sorts games by popularity
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
              });
              this.setState({ games: games });
            });
          return jsonData;
        });
      })
      .catch(err => err.text())
      .then(errorMessage => {
        let gamesError = ["ERROR", `ERROR: ${toString(errorMessage)}`];
        this.setState({ games: gamesError });
      });
  };
  //tracks what is in searchbox
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    return (
      <div className="flex-center">
        <div id="top" className="flex-across">
          <header className="item-center">
            <h1>boardgame search</h1>
            <SearchBar
              onSearchChange={this.onSearchChange}
              onButtonSubmit={this.onButtonSubmit}
            />
          </header>
          <div id="tips" className="flex-center">
            <div className="flex-center">
              <p>Things to know</p>
              <p>Use "quotes" to search exact phrases (e.g. "agricola")</p>
              <p>
                This website sorts searches by popular vote using BoardGameGeek
                XML API2
              </p>
            </div>
          </div>
        </div>
        <div className="flex-center">
          <BoardGameImage
            className="flex-center"
            games={this.state.games}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default App;
