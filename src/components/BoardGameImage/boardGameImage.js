import React from 'react';
import './boardGameImage.css'

const BoardGameImage = ({games}) => {
    // games.forEach(element => {
    //     imgAndName.push(element.image);
    //     imgAndName.push(element.name)

    // });
    // games.forEach(element =>{
    //     return name.push(element.name)
    // })
    return (
        <div className='flex-row' id = "images">
        {Object.values(games).map((game) =>{
            return(
            <div className='flex-center games-searched'>
            <img className = 'shadow-5' key={game} id = "game-img" alt={game.name} src={game.image}/>
            <h3 key={game + ".1"} className='flex-center'>{game.name}</h3>
            </div>
            )
        })}
        </div>
    );
}

export default BoardGameImage;