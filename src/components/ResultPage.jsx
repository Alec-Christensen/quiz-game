import React from 'react'

const ResultPage = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="page-container">
        <h1>Quiz finished!</h1>
        <p>
            You got {score} out of {totalQuestions} correct.
        </p>
        <button onClick={onRestart}>Start Over</button>
    </div>
  );
};

export default ResultPage;