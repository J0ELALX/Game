import React, { useState } from "react";
import './MapGame.css';

const SIZE = 10;
const START = [0, 0];
const REVEAL_COST = 5;

function getNeighbors([x, y]) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(([nx, ny]) => nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE);
}

function MapGame({ points: startPoints, onFinish, goal }) {
  const [player, setPlayer] = useState(START);
  const [points, setPoints] = useState(startPoints);
  const [revealed, setRevealed] = useState(() => {
    const arr = Array(SIZE).fill(0).map(() => Array(SIZE).fill(false));
    arr[START[0]][START[1]] = true;
    return arr;
  });
  const [message, setMessage] = useState('');

  const reveal = (x, y) => {
    if (points < REVEAL_COST || revealed[x][y]) return;
    setPoints(p => p - REVEAL_COST);
    setRevealed(r => {
      const copy = r.map(row => row.slice());
      copy[x][y] = true;
      return copy;
    });
  };

  const move = (x, y) => {
    if (!revealed[x][y]) return;
    setPlayer([x, y]);
    if (x === goal[0] && y === goal[1]) {
      setMessage('Congratulations! You reached the Vape-Free Zone!');
      setTimeout(() => onFinish(true), 2000);
    }
  };

  React.useEffect(() => {
    if (points < REVEAL_COST && !revealed[goal[0]][goal[1]] && (player[0] !== goal[0] || player[1] !== goal[1])) {
      setMessage('Out of points! Better luck next time!');
      setTimeout(() => onFinish(false), 2000);
    }
  }, [points, revealed, player, onFinish, goal]);

  return (
    <div className="mapgame-area">
      <h2 className="comic-title">Vape-Free Zone Map</h2>
      <div className="mapgame-points">Points: {points}</div>
      <div className="mapgame-grid">
        {Array(SIZE).fill(0).map((_, x) => (
          <div key={x} className="mapgame-row">
            {Array(SIZE).fill(0).map((_, y) => {
              const isPlayer = player[0] === x && player[1] === y;
              const isGoal = goal[0] === x && goal[1] === y;
              return (
                <div
                  key={y}
                  className={`mapgame-cell${revealed[x][y] ? ' revealed' : ''}${isPlayer ? ' player' : ''}`}
                  onClick={() => isPlayer ? null : revealed[x][y] ? move(x, y) : getNeighbors(player).some(([nx, ny]) => nx === x && ny === y) ? reveal(x, y) : null}
                  title={isPlayer ? 'You' : ''}
                >
                  {isPlayer ? '🧑‍🚀' : revealed[x][y] ? '' : '❓'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {message && <div className="mapgame-message">{message}</div>}
      <div className="mapgame-help">Click ❓ next to you to reveal (costs 5 points). Click revealed cells to move. Find the hidden Vape-Free Zone!</div>
    </div>
  );
}

export default MapGame; 