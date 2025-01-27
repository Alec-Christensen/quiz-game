import StartPage from './components/StartPage';
import React, { useState } from 'react';
import QuizPage from './components/QuizPage';


function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
      <div>
        {!gameStarted ? (
          <StartPage onStart={() => setGameStarted(true)} />
        ) : (
          <QuizPage />
        )}
      </div>
  );
};

export default App;