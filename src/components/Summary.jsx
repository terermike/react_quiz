import trophy from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ answers }) {
  const skipped = Math.round(
    (answers.filter((answer) => answer === null).length / answers.length) * 100
  );

  const correct = Math.round(
    (answers.filter((answer, index) => answer === QUESTIONS[index].answers[0])
      .length /
      answers.length) *
      100
  );

  const incorrect = 100 - skipped - correct;

  return (
    <div id="summary">
      <img src={trophy} alt="Trophy Image" />
      <h2>Quiz Complete!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skipped}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correct}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrect}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <div>
        <ol>
          {answers.map((answer, index) => {
            let cssClass = "user-answer";

            if (answer === null) {
              cssClass += " skipped";
            } else if (QUESTIONS[index].answers[0] !== answer) {
              cssClass += " wrong";
            } else {
              cssClass += " correct";
            }
            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <span className="question">{QUESTIONS[index].text}</span>
                <span className={cssClass}>{answer ?? " skipped"}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
