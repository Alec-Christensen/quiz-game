import React from 'react';

const StartPage = ({ onStart }) => {
    return (
        <div>
            <h1>Welcome to my Quiz Game</h1>
            <p>Test your knowledge and see how many questions you can answer correctly.</p>
            <button onClick={onStart}>Start Quiz</button>
        </div>
    );
};

export default StartPage;