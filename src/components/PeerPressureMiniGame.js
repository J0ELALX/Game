import React, { useState, useEffect } from "react";
import './PeerPressureMiniGame.css';

function PeerPressureMiniGame({ onResult }) {
  const [showBtn, setShowBtn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    const delay = 1000 + Math.random() * 1000;
    const timer = setTimeout(() => {
      setShowBtn(true);
      setStartTime(Date.now());
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const rt = Date.now() - startTime;
    setReaction(rt);
    setShowBtn(false);
    setTimeout(() => onResult(rt < 600), 1200);
  };

  return (
    <div className="mini-game-panel">
      <div className="mini-game-question">Peer Pressure Simulator</div>
      <div className="mini-game-statement">
        When someone offers you a vape, how fast can you say <b>"No thanks!"</b>?
      </div>
      {showBtn ? (
        <button className="comic-btn peer-btn" onClick={handleClick}>No thanks!</button>
      ) : reaction === null ? (
        <div className="mini-game-wait">Get ready...</div>
      ) : (
        <div className="mini-game-result">
          {reaction < 600 ? 'Great job! You dodged the pressure! 🚀' : 'Good try! Stay alert!'}<br/>
          Reaction time: {reaction} ms
        </div>
      )}
    </div>
  );
}

export default PeerPressureMiniGame; 