import React from "react";
import './Scene.css';

function Scene({ scene, onChoice }) {
  return (
    <div className="scene-panel">
      <div className="speech-bubble">
        <div className="scene-text">{scene.text}</div>
      </div>
      <div className="choices-list">
        {scene.choices.map((choice, idx) => (
          <button
            key={idx}
            className="comic-btn choice-btn"
            onClick={() => onChoice(idx)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Scene; 