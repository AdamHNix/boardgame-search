import React from 'react';
//xml to json coverter
import xml2js from 'xml2js'

const parseString = xml2js.parseString;
const Game = ({searchStatus}) =>{
    //fetches BGG xmlapi2
     let getGames = () => {
         //convert xml to JSON
        // fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchStatus}`)
        return fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=agricola`)
        .then(response => response.text())
        .then( games2Json =>
            parseString(games2Json, function (err, result) {
            console.dir(result);
            }))
    }
    console.log(getGames());
    return (
    <div>
        <img alt = "boardgame" src="#" />
        <div>
        </div>
    </div>
    );
}

export default Game;