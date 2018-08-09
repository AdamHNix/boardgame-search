import React from 'react';
//xml to json coverter
import xml2js from 'xml2js';

let parseString = xml2js.parseString;

const Game = ({searchStatus}) =>{
    //fetches BGG xmlapi2
     let getGames = () => {
         console.log("HI")
        // fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${searchStatus}`)
        fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=agricola`)
        .then(response => response.text())
        //test to see if XML fetch is working
        .then(data => console.log(data));
    }
    //converts BGG xml api to json
    let games2Json = getGames()
    parseString(games2Json, function (err, result) {
        JSON.stringify(result);
    });
    console.log(games2Json)
    return (
    <div>
        <img alt = "boardgame" src="#" />
        <div>
        </div>
    </div>
    );
}

export default Game;