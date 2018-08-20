import React from "react";
import "./boardGameImage.css";

const BoardGameImage = ({ games }) => {
  if (games[0] === "Sorry, I couldn't find anything...") {
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
            <a href={link} target="_blank">
              <div className="flex-center games-searched">
                <img
                  className="shadow-5"
                  key={game + "image"}
                  id="game-img"
                  alt="unavailable"
                  src={game.image[0]}
                />
                <h3 key={game + "name"} className="flex-center">
                  {game.name[0].$.value}
                </h3>
                <h4 className="flex-center">{game.yearpublished[0].$.value}</h4>
              </div>
            </a>
          );
        })}
      </div>
    );
  }
};

export default BoardGameImage;
