import StartPage from './components/StartPage';
import React, { useState } from 'react';


function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
      <div>
        {!gameStarted ? (
          <StartPage onStart={() => setGameStarted(true)} />
        ) : (
          <h2>Quiz is starting...</h2>
        )}
      </div>
  );
}

export default App