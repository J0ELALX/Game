import React, { useState } from "react";
import './MiniGame.css';

function MiniGame({ statement, answer, onResult }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handlePick = (pick) => {
    setSelected(pick);
    setShowResult(true);
    setTimeout(() => {
      onResult(pick === answer);
    }, 1200);
  };

  return (
    <div className="mini-game-panel">
      <div className="mini-game-question">Myth or Fact?</div>
      <div className="mini-game-statement">{statement}</div>
      <div className="mini-game-choices">
        <button className={`comic-btn myth-btn${selected==='myth' ? ' selected' : ''}`} onClick={() => handlePick('myth')} disabled={!!selected}>Myth</button>
        <button className={`comic-btn fact-btn${selected==='fact' ? ' selected' : ''}`} onClick={() => handlePick('fact')} disabled={!!selected}>Fact</button>
      </div>
      {showResult && (
        <div className="mini-game-result">
          {selected === answer ? 'Correct! 🎉' : 'Oops!'}
        </div>
      )}
    </div>
  );
}

export default MiniGame; 