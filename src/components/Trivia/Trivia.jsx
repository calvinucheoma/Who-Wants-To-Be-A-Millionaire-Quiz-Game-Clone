import React, { useEffect, useState } from 'react';
import useSound from "use-sound";
import play from '../../sounds/play.mp3';
import correct from '../../sounds/correct.mp3';
import wrong from '../../sounds/wrong.mp3';
import './Trivia.css';


const Trivia = ({data, questionNumber, setQuestionNumber, setStop, setTimerRunning}) => {

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("trivia__answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
     setQuestion(data[questionNumber - 1])
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
     setTimeout(() => {
        callback();
     }, duration);
  };

  const handleClick = (a) => {
      setTimerRunning(false);
      setSelectedAnswer(a);
      setClassName("trivia__answer active");
      delay(3000, () => {
          setClassName(a.correct ? "trivia__answer correct" : "trivia__answer wrong")
      });
      delay(5000, () => {
          if(a.correct) {
            correctAnswer();
            delay(1000, () => {
              setQuestionNumber((prev) => prev + 1);
              setSelectedAnswer(null);
              setTimerRunning(true);              
            })
          } else {
            wrongAnswer();
            delay(1000, () => {
            setStop(true);              
            });
          };
      });
  };

  return (

    <div className='trivia'>

        <div className="trivia__question">
            {question?.question}
        </div>

        <div className="trivia__options">
            {question?.answers.map((answer, index) => (
              <div 
                className={selectedAnswer === answer ? className : "trivia__answer"}
                key={index} 
                onClick={() => handleClick(answer)}
              >
                  {answer.text}
              </div>
            ))}
        </div>

    </div>

  )

};

export default Trivia;