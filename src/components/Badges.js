import React from "react";
import './Badges.css';

export const badgeIcons = {
  mythBuster: { icon: '🕵️‍♂️', name: 'Myth Buster' },
  peerLeader: { icon: '🦸‍♂️', name: 'Peer Leader' },
  strongChoice: { icon: '💪', name: 'Strong Choice' },
};

function Badges({ badges, newBadge }) {
  return (
    <div className="badges-comic">
      {badges.map(b => (
        <div className={`badge-item${newBadge === b ? ' badge-animate' : ''}`} key={b}>
          <span className="badge-emoji" role="img" aria-label={badgeIcons[b]?.name}>{badgeIcons[b]?.icon}</span>
          <div className="badge-name">{badgeIcons[b]?.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Badges; 