import React from 'react';
import './Winner.css';



const Winner = ({username, earned, restartGame}) => {

  return (

    <div className='winner'>
        <h1 className='winnerTitle'>
            Congratulations {username}!!!👏👏👏🤩⭐⭐⭐💰💰💰
        </h1>
        <p className='winnerText'>
            You are a proud winner of {earned}!!! Enjoy!!
        </p>
        <button className='winnerButton' onClick={restartGame}> Restart Game </button>
    </div>

  )

};

export default Winner;