import React, { useState, useEffect} from 'react';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        fetch('/src/data/questions.json')
          .then((response) => response.json())
          .then((data) => setQuestions(data))
          .catch((error) => console.error('Error loading questions:', error));
      }, []);

      if (questions.length === 0) {
        return <div>Loading questions...</div>;
      }

      if (currentQuestionIndex >= questions.length) {
        return <div>Quiz finished!</div>;
      }      
            
  return (
    <div>
        <h2>{questions[currentQuestionIndex].question}</h2>
        <ul>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <button
          onClick={() =>
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
          }
        >
          Next Question
        </button>
    </div>
  );
};

export default QuizPage;