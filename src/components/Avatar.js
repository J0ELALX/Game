import React from "react";
import './Avatar.css';

export const avatarOptions = [
  { key: 'neutral', icon: '🧑', label: 'Classic' },
  { key: 'happy', icon: '😃', label: 'Happy' },
  { key: 'confident', icon: '😎', label: 'Confident' },
  { key: 'worried', icon: '😟', label: 'Worried' },
  { key: 'proud', icon: '🥳', label: 'Proud' },
  { key: 'girl', icon: '👧', label: 'Girl' },
  { key: 'boy', icon: '👦', label: 'Boy' },
  { key: 'curly', icon: '🧑‍🦱', label: 'Curly Hair' },
  { key: 'redhair', icon: '🧑‍🦰', label: 'Red Hair' },
  { key: 'beard', icon: '🧔', label: 'Beard' },
];

const avatarMap = Object.fromEntries(avatarOptions.map(a => [a.key, a.icon]));
const accessoryMap = {
  hat: '🎩',
  glasses: '🕶️',
  cape: '🦸',
};

function Avatar({ emotion = 'neutral', avatarKey, accessories = [] }) {
  const icon = avatarKey ? avatarMap[avatarKey] : avatarMap[emotion] || avatarMap.neutral;
  return (
    <div className="avatar-comic">
      <span className="avatar-emoji" role="img" aria-label={avatarKey || emotion}>
        {icon}
      </span>
      {accessories.length > 0 && (
        <div className="avatar-accessories">
          {accessories.map(acc => (
            <span key={acc} className="avatar-accessory" role="img" aria-label={acc}>{accessoryMap[acc]}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Avatar; 