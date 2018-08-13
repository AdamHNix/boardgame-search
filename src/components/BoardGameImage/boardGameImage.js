import React from 'react';
import './boardGameImage.css'

const BoardGameImage = ({games}) => {
    console.log(Object.values(games))
    let img = '';
    games.array.forEach(element => {
        return img = element.image;
    });
    return (
        <div>
            <img id = "game-img" alt='' src={img}/>
            <h3>{games.name}</h3>
        </div>
    );
}

export default BoardGameImage;