import React from "react";
import './ScoreBoard.css';

function ScoreBoard({ score, animateScore, points }) {
  return (
    <div className="scoreboard">
      <div className={`score-item health${animateScore?.health ? ' score-animate' : ''}`}>Health: <span>{score.health}</span></div>
      <div className={`score-item mental${animateScore?.mental ? ' score-animate' : ''}`}>Mental Strength: <span>{score.mental}</span></div>
      <div className={`score-item social${animateScore?.social ? ' score-animate' : ''}`}>Social Status: <span>{score.social}</span></div>
      <div className="score-item points">Points: <span>{points}</span></div>
    </div>
  );
}

export default ScoreBoard; 