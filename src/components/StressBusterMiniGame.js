import React, { useState } from "react";
import './StressBusterMiniGame.css';

function StressBusterMiniGame({ onResult }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setDone(true);
      setTimeout(() => onResult(true), 1200);
    }
  };

  return (
    <div className="mini-game-panel">
      <div className="mini-game-question">Stress Buster</div>
      <div className="mini-game-statement">
        {done ? 'Great job! You calmed your mind! 🧘‍♂️' :
          step % 2 === 0 ? 'Breathe in... (Click the button)' : 'Breathe out... (Click the button)'}
      </div>
      {!done && (
        <button className="comic-btn stress-btn" onClick={handleClick}>
          {step % 2 === 0 ? 'Breathe In' : 'Breathe Out'}
        </button>
      )}
    </div>
  );
}

export default StressBusterMiniGame; 