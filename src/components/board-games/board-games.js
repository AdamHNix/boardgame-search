// import React from 'react';
// //xml to json coverter
// import xml2js from 'xml2js';

// const parseString = xml2js.parseString;
// const Game = ({searchStatus}) =>{
//     //fetches BGG xmlapi2
//      onButtonSubmit = (search) => {//I want this function to return gameName
//          let gameName;
//         fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${search}`)
//         .then(response => response.text())
//         //convert xml to JSON
//         .then(data =>
//             {let jsonData = parseString(data, (err, result) => {
//             if (err){
//                 console.log("ERROR converting XML!");
//             }
//             (JSON.stringify(result));
//             console.log(result)
//             return result;
//             // gameName = result.items.item[0].name[0].$.value
//             // console.log(gameName)
//             })
//         console.log(jsonData)
//          return jsonData;
//         }
//         )
//         .then(newData =>
//             console.dir(newData)
//             //console.log(newData.items.item[0].name[0].$.value)
//         )

//     }

//     // async function getGame(search){
//     //     //await BGG response
//     //     let response = await fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${search}`)
//     //     //convert xml to text
//     //     let data = await response.text()
//     //     //convert xml text to json
//     //     let jsonData = await parseString(data, (err, result) =>{
//     //         if (err){
//     //             return ("ERROR converting XML!")
//     //         }
//     //         JSON.stringify(result)
//     //         //variable for name of boardgame searched for
//     //         let game;
//     //         game = result.items.item[0].name[0].$.value
//     //         console.log(game);
//     //     })
//     //     return jsonData;
//     // }
//     //test async await function
//     // getGame('Agricola')
//     // .then(jsonData => console.log(jsonData))

//     return (
//     <div>
//         <img alt = "boardgame" src="#" />
//         <div>
//         </div>
//     </div>
//     );
// }

// export default Game;