import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import trophy from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, []);

  const handleSkipQuestion = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={trophy} alt="Trophy Image" />
        <h2>Quiz Complete!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipQuestion}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
