import React from "react";
import "./boardGameImage.css";

const BoardGameImage = ({ games, loading, count }) => {
  if (loading) {
    return (
      <div>
        <h2>LOADING...</h2>
      </div>
    );
  } else if (games[0] === "ERROR") {
    // temoporary fix for loading issues...
    if (count <= 1) {
      return null;
    } else if (loading) {
      return (
        <div>
          <h2>LOADING...</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{games[1]}</h2>
        </div>
      );
    }
  } else if (games[0] === "Sorry, I couldn't find anything...") {
    return (
      <div id="sorry">
        <h2 className="flex-center">{games[0]}</h2>
      </div>
    );
  } else {
    return (
      <div className="flex-row" id="images">
        {Object.values(games).map(game => {
          if (game === null) {
            return true;
          } else if (game.image === undefined) {
            game.image = [""];
          }
          let link = "https://boardgamegeek.com/boardgame/" + game.$.id;
          return (
            <div key={game.$.id}>
              <a href={link} target="_blank">
                <div className="flex-center games-searched">
                  <img
                    className="shadow-5"
                    key={game.image[0]}
                    id="game-img"
                    alt="unavailable"
                    src={game.image[0]}
                  />
                  <h3 key={game.name[0].$.value} className="flex-center">
                    {game.name[0].$.value}
                  </h3>
                  <h4 className="flex-center">
                    {game.yearpublished[0].$.value}
                  </h4>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
};

export default BoardGameImage;
