import React, { useState } from "react";
import './QuizBlitzMiniGame.css';

const questions = [
  {
    q: 'Vaping can be addictive because most vapes contain what substance?',
    options: ['Sugar', 'Nicotine', 'Water', 'Vitamins'],
    answer: 1
  },
  {
    q: 'True or False: Vape aerosol is safe for your lungs.',
    options: ['True', 'False'],
    answer: 1
  }
];

function QuizBlitzMiniGame({ onResult }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handlePick = (i) => {
    setSelected(i);
    setTimeout(() => {
      if (i === questions[idx].answer) setScore(s => s + 1);
      if (idx + 1 < questions.length) {
        setIdx(idx + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        setTimeout(() => onResult(score + (i === questions[idx].answer ? 1 : 0)), 1400);
      }
    }, 900);
  };

  return (
    <div className="mini-game-panel">
      <div className="mini-game-question">Quiz Blitz</div>
      {showResult ? (
        <div className="mini-game-result">
          You got {score} out of {questions.length} correct!
        </div>
      ) : (
        <>
          <div className="mini-game-statement">{questions[idx].q}</div>
          <div className="mini-game-choices">
            {questions[idx].options.map((opt, i) => (
              <button
                key={i}
                className={`comic-btn quiz-btn${selected === i ? ' selected' : ''}`}
                onClick={() => handlePick(i)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuizBlitzMiniGame; 