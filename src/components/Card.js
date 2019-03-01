import React from 'react';

const Card = ({name,model,manufacturer,cost,starshipClass}) => {
    return (
        <div className="tc fw8 black-90 bg-white-20 dib br3 pa3 ma2 grow bw2 shadow-5">
            <h2>Name: {name}</h2>
            <p>Model: {model}</p>
            <p>Manufacturer: {manufacturer}</p>
            <p>Cost: {cost}</p>
            <p>StarShip Class: {starshipClass}</p>
        </div>
    )
};

export default Card;