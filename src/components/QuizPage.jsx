import React, { useState, useEffect } from 'react';

const QuizPage = ({ score, setScore, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetch('/src/data/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error loading questions:', error));
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      onFinish();
    }
  }, [currentQuestionIndex, questions.length]);  

  const handleAnswer = (selectedOption) => {
    if (optionsLocked) return;

    setSelectedOption(selectedOption);

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      setFeedback('Correct!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback('Wrong!');
    }

    setAnswered(true);
    setOptionsLocked(true);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswer(option)}
                className={`option ${selectedOption === option ? "selected" : ""} ${optionsLocked ? "locked" : ""}`}
              >
                {option}
              </li>
            ))}
          </ul>
          {feedback && (
            <div className={`feedback ${feedback === "Correct!" ? "correct-feedback" : "wrong-feedback"}`}>
              {feedback}
            </div>
          )}
          <button
            onClick={() => {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setFeedback(null);
              setAnswered(false);
              setOptionsLocked(false);
            }}
            disabled={!answered}
          >
            Next Question
          </button>
        </>
      ) : null}
    </div>
  );
};

export default QuizPage;
