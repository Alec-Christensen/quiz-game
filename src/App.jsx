import React, { useState } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  return (
    <div>
      {!gameStarted ? (
        <StartPage onStart={() => setGameStarted(true)} />
      ) : quizFinished ? ( 
        <ResultPage
          score={score}
          totalQuestions={5} 
          onRestart={() => {
            setGameStarted(false); 
            setScore(0); 
            setQuizFinished(false);
          }}
        />
      ) : (
        <QuizPage
          score={score}
          setScore={setScore}
          onFinish={() => setQuizFinished(true)}
        />
      )}
    </div>
  );
}

export default App;