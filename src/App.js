import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Start from './components/Start/Start';
import Timer from './components/Timer/Timer';
import Trivia from './components/Trivia/Trivia';
import Winner from './components/Winner/Winner';
import {data} from './data/data';


function App() {

  const moneyPyramid = useMemo(() => 
    [
        {id:1, amount:" ₦5,000"},
        {id:2, amount:" ₦7,500"},
        {id:3, amount:" ₦10,000"},
        {id:4, amount:" ₦15,000"},
        {id:5, amount:" ₦20,000"},
        {id:6, amount:" ₦30,000"},
        {id:7, amount:" ₦45,000"},
        {id:8, amount:" ₦70,000"},
        {id:9, amount:" ₦120,000"},
        {id:10, amount:" ₦250,000"},
        {id:11, amount:" ₦500,000"},
        {id:12, amount:" ₦1,000,000"},
        {id:13, amount:" ₦2,000,000"},
        {id:14, amount:" ₦5,000,000"},
        {id:15, amount:" ₦10,000,000"},
    ].reverse(), //an array method to reverse the order just like flex-direction: column reverse;
  []);

  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₦ 0");
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    questionNumber > 1 && 
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  const playAgain = () => {
    setQuestionNumber(1);
    setStop(false);
    setEarned("₦ 0");
    setTimerRunning(true);
  };

  const quitGame = () => {
    setTimerRunning(false);
    setStop(true);
  };

  const exitGame = () => {
    setTimerRunning(false);
    setUsername(null);
    setQuestionNumber(1);
    setEarned("₦ 0");
  };

  return (

    <div className="app">

        {username ? (

          <>

            {questionNumber > 15 ? <Winner username={username} earned={earned} restartGame={playAgain} /> 
              : (
                
                <>
                  <div className="main">

                    {stop ? 
                      <div className='endPage'>
                        <h1 className='endText'> You earned: {earned} </h1>
                        <button 
                          className='endButton'
                          onClick={playAgain}
                        >
                            Play Again
                        </button>
                      </div>
                      : (
                      <>
                        <div className="mainTop">
                          <div className="timer">
                            <Timer 
                                setStop={setStop} 
                                questionNumber={questionNumber} 
                                timerRunning={timerRunning}
                            />
                          </div>
                        </div>

                        <div className="mainBottom">
                            <Trivia 
                                data={data} 
                                setStop={setStop} 
                                questionNumber={questionNumber}
                                setQuestionNumber={setQuestionNumber}
                                setTimerRunning={setTimerRunning}
                            />
                        </div>       
                      </>
                    )}

                  </div>

                  <div className="pyramid">

                    <div className='userList'>
                        <div className="gameButtons">
                            <button 
                              className='quitGame' 
                              onClick={quitGame}
                            >
                                Quit
                            </button>
                            <button 
                              className="exitGame"
                              onClick={exitGame}
                            >
                                Exit
                            </button>                    
                        </div>

                        <div className="userDetails">
                            <p className="userName">Name: {username}</p>
                            <p className='userMoney'>Total Money: <br/> {earned}</p>                    
                        </div>

                    </div>
                    
                    <ul className="moneyList">

                        {moneyPyramid.map((money, index) => {
                          return (
                            <li 
                              className={questionNumber === money.id ? 'moneyListItem active' : 'moneyListItem'} 
                              key={index}
                            >
                                <span className='moneyListItemNumber'>{money.id}</span>
                                <span className="moneyListItemAmount">{money.amount}</span>
                            </li>
                          )
                        })}

                    </ul>

                  </div>   
                  </>
                )
            }       
          </>
         ) : (
              <Start setUsername={setUsername}/>
             )      
        } 

    </div>

  );

};

export default App;
