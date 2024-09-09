import { useState, useEffect } from 'react';
import Home from './Components/Home';

function App() {
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  function handleAnswerSelection(event) {
    setSelectedAnswer(event.target.value);
  }

  function handleNextQuestion() {
    if (selectedAnswer === data[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  }

  function startQuiz(name) {
    setIsQuizStarted(true);
    setUserName(name);
  }

  return (
    <>
      {!isQuizStarted ? (
        <Home onStartQuiz={startQuiz} />
      ) : (
        <div className="option-div">
          {showScore ? (
            <div className="home-div">
              <h2>Quiz Complete!</h2>
              <p>{userName}, Your score is <strong>{score}</strong> out of <strong>{data.length}</strong></p>
             
              <p className='emoji'>
                {score > 7 ? "Great job!  👍" : "Better luck next time! 😢"}
              </p>

            </div>
          ) : (
            data.length > 0 && (
              <div className="map-div">
                <p>{currentQuestion}/{data.length}</p>
                <h2>{data[currentQuestion].question.text}</h2>
                <form>
                  {data[currentQuestion].incorrectAnswers
                    .concat(data[currentQuestion].correctAnswer)
                    .sort()
                    .map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={handleAnswerSelection}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                </form>
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}>
                  Next
                </button>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default App;
