import React, { useState, useEffect } from 'react';

const QuizPage = ({ score, setScore, onFinish }) => {
  // State-variabler
  const [questions, setQuestions] = useState([]); // Håller frågorna från JSON-filen
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Håller koll på aktuell fråga
  const [feedback, setFeedback] = useState(null); // För rätt/fel-feedback
  const [answered, setAnswered] = useState(false); // Om användaren har svarat
  const [optionsLocked, setOptionsLocked] = useState(false); // Om alternativen är låsta

  // Ladda frågor från JSON
  useEffect(() => {
    fetch('/src/data/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error loading questions:', error));
  }, []);

  // Hanterar användarens svar
  const handleAnswer = (selectedOption) => {
    if (optionsLocked) return; // Förhindra flera val på samma fråga

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      setFeedback('Correct!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback('Wrong!');
    }

    setAnswered(true); // Aktivera "Next Question"-knappen
    setOptionsLocked(true); // Lås alternativen efter valet
  };

  // Rendera laddningsmeddelande om frågor inte har laddats
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  // Kontrollera om quizet är klart och signalera till App.jsx
  if (questions.length > 0 && currentQuestionIndex >= questions.length) {
    onFinish(); // Signalera att quizet är klart
    return null; // Returnera inget eftersom ResultPage visas från App.jsx
  }

  // Rendera frågan och svarsalternativen
  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestionIndex].question}</h2>
      <ul>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleAnswer(option)} // Hantera användarens val
            style={{
              cursor: optionsLocked ? 'default' : 'pointer',
              listStyle: 'none',
              opacity: optionsLocked ? 0.6 : 1, // Gör alternativen gråa om de är låsta
            }}
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
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Nästa fråga
          setFeedback(null); // Återställ feedback
          setAnswered(false); // Återställ knapplåsning
          setOptionsLocked(false); // Lås upp alternativen för nästa fråga
        }}
        disabled={!answered} // Gör knappen otillgänglig tills användaren har svarat
      >
        Next Question
      </button>
    </div>
  );
};

export default QuizPage;