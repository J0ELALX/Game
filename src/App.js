import React, { useState, useEffect } from "react";
import './App.css';
import Scene from './components/Scene';
import ScoreBoard from './components/ScoreBoard';
import scenes from './data/scenes';
import MiniGame from './components/MiniGame';
import Avatar, { avatarOptions } from './components/Avatar';
import Badges from './components/Badges';
import PeerPressureMiniGame from './components/PeerPressureMiniGame';
import './components/PeerPressureMiniGame.css';
import StressBusterMiniGame from './components/StressBusterMiniGame';
import QuizBlitzMiniGame from './components/QuizBlitzMiniGame';
import './components/StressBusterMiniGame.css';
import './components/QuizBlitzMiniGame.css';
import { stickers } from './components/stickers';
import StickerAlbum from './components/StickerAlbum';
import { Howl } from 'howler';

const TITLE = "Power Up: The Smart Choice Adventure";

const INITIAL_SCORE = { health: 5, mental: 5, social: 5 };

const MYTH_FACT_QUIZ = {
  statement: 'Vaping is just harmless water vapor.',
  answer: 'myth',
  correctMsg: 'Correct! Vape aerosol contains harmful chemicals, not just water. (CDC)',
  wrongMsg: 'Oops! Vape aerosol is NOT just water vapor. It contains harmful chemicals. (CDC)'
};

const POWER_UP_EVENTS = [
  { msg: 'You inspired a friend! +1 Social Status', effect: s => ({ ...s, social: s.social + 1 }) },
  { msg: 'You got a shoutout from your teacher! +1 Mental Strength', effect: s => ({ ...s, mental: s.mental + 1 }) },
  { msg: 'You feel extra healthy today! +1 Health', effect: s => ({ ...s, health: s.health + 1 }) },
];

const ACCESSORIES = ['hat', 'glasses', 'cape'];
const SILLY_EVENTS = [
  { msg: 'A dancing banana congratulates you! 🍌💃', accessory: 'hat' },
  { msg: 'You get a superhero cape for your courage! 🦸', accessory: 'cape' },
  { msg: 'You found cool shades! 😎', accessory: 'glasses' },
  { msg: 'A comic POW! moment gives you a power boost! 💥', accessory: null },
];

const badgeSound = new Howl({ src: [require('./assets/badge.mp3')], volume: 0.5 });
const stickerSound = new Howl({ src: [require('./assets/sticker.mp3')], volume: 0.5 });
const winSound = new Howl({ src: [require('./assets/win.mp3')], volume: 0.5 });
const bgMusic = new Howl({ src: [require('./assets/bg-music.mp3')], loop: true, volume: 0.2 });

function getRandomSticker(collected) {
  const available = stickers.filter(s => !collected.includes(s.key));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)].key;
}

function SillyEventOverlay({ event, onClose }) {
  if (!event) return null;
  return (
    <div className="silly-event-overlay" onClick={onClose}>
      <div className="silly-event-bubble">{event.msg}</div>
      <button className="comic-btn" style={{ marginTop: 16 }} onClick={onClose}>OK</button>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [showFact, setShowFact] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showPeerMiniGame, setShowPeerMiniGame] = useState(false);
  const [showStressMiniGame, setShowStressMiniGame] = useState(false);
  const [showQuizMiniGame, setShowQuizMiniGame] = useState(false);
  const [animateScore, setAnimateScore] = useState({ health: false, mental: false, social: false });
  const [badges, setBadges] = useState([]);
  const [avatarEmotion, setAvatarEmotion] = useState('neutral');
  const [newBadge, setNewBadge] = useState(null);
  const [motivation, setMotivation] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('neutral');
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [collectedStickers, setCollectedStickers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [muted, setMuted] = useState(false);
  const [avatarAccessories, setAvatarAccessories] = useState([]);
  const [sillyEvent, setSillyEvent] = useState(null);

  useEffect(() => {
    if (!muted) bgMusic.play();
    else bgMusic.pause();
    return () => bgMusic.stop();
  }, [muted]);

  function maybeSillyEvent() {
    if (Math.random() < 0.3) {
      const event = SILLY_EVENTS[Math.floor(Math.random() * SILLY_EVENTS.length)];
      setSillyEvent(event);
      if (event.accessory && !avatarAccessories.includes(event.accessory)) {
        setAvatarAccessories(accs => [...accs, event.accessory]);
      }
    }
  }

  const handleChoice = (choiceIdx) => {
    const choice = scenes[sceneIdx].choices[choiceIdx];
    // Set avatar emotion based on choice
    if (choice.consequence.health > 0 || choice.consequence.mental > 0) {
      setAvatarEmotion('confident');
    } else if (choice.consequence.health < 0) {
      setAvatarEmotion('worried');
    } else {
      setAvatarEmotion('neutral');
    }
    // Award badges
    let badgeEarned = null;
    if (sceneIdx === 3 && choiceIdx === 1 && !badges.includes('peerLeader')) {
      setBadges(b => [...b, 'peerLeader']);
      badgeEarned = 'peerLeader';
    }
    if ((choice.text.toLowerCase().includes('refuse') || choice.text.toLowerCase().includes('not interested')) && !badges.includes('strongChoice')) {
      setBadges(b => [...b, 'strongChoice']);
      badgeEarned = 'strongChoice';
    }
    setNewBadge(badgeEarned);
    if ((choice.consequence.health > 0 || choice.consequence.mental > 0) && !showPeerMiniGame && !showMiniGame) {
      setMotivation('Power Up! You made a strong choice!');
      setTimeout(() => setMotivation(''), 1500);
      // Random Power Up event (30% chance)
      if (Math.random() < 0.3) {
        const event = POWER_UP_EVENTS[Math.floor(Math.random() * POWER_UP_EVENTS.length)];
        setTimeout(() => {
          setMotivation(event.msg);
          setScore(prev => event.effect(prev));
          setTimeout(() => setMotivation(''), 1500);
        }, 1600);
      }
      // Silly event and accessory
      maybeSillyEvent();
    }
    setScore(prev => {
      const newScore = {
        health: Math.max(0, prev.health + choice.consequence.health),
        mental: Math.max(0, prev.mental + choice.consequence.mental),
        social: Math.max(0, prev.social + choice.consequence.social),
      };
      setAnimateScore({
        health: choice.consequence.health !== 0,
        mental: choice.consequence.mental !== 0,
        social: choice.consequence.social !== 0
      });
      setTimeout(() => setAnimateScore({ health: false, mental: false, social: false }), 900);
      return newScore;
    });
    setShowFact(choice.fact);
    setTimeout(() => {
      setShowFact(null);
      if (sceneIdx === 1) {
        setShowPeerMiniGame(true);
      } else if (sceneIdx === 2) {
        setShowMiniGame(true);
      } else if (sceneIdx === 4) {
        setShowStressMiniGame(true);
      } else if (sceneIdx === 5) {
        setShowQuizMiniGame(true);
      } else if (scenes[sceneIdx].choices[choiceIdx].next >= scenes.length) {
        setGameOver(true);
      } else {
        setSceneIdx(scenes[sceneIdx].choices[choiceIdx].next);
      }
    }, 2200);
  };

  const handlePeerMiniGameResult = (fast) => {
    setShowPeerMiniGame(false);
    if (fast) {
      setScore(prev => ({ ...prev, social: prev.social + 2 }));
      setMotivation('Awesome! You dodged peer pressure!');
      setTimeout(() => setMotivation(''), 1500);
    }
    setSceneIdx(sceneIdx + 1);
  };

  const handleMiniGameResult = (correct) => {
    setShowMiniGame(false);
    if (correct) {
      setScore(prev => ({ ...prev, mental: prev.mental + 2 }));
      setShowFact(MYTH_FACT_QUIZ.correctMsg);
      if (!badges.includes('mythBuster')) setBadges(b => [...b, 'mythBuster']);
      setAvatarEmotion('happy');
      // Silly event and accessory
      maybeSillyEvent();
    } else {
      setShowFact(MYTH_FACT_QUIZ.wrongMsg);
      setAvatarEmotion('worried');
    }
    setTimeout(() => {
      setShowFact(null);
      if (sceneIdx + 1 >= scenes.length) {
        setGameOver(true);
      } else {
        setSceneIdx(sceneIdx + 1);
      }
    }, 2200);
  };

  const handleStressMiniGameResult = () => {
    setShowStressMiniGame(false);
    setScore(prev => ({ ...prev, mental: prev.mental + 2 }));
    setMotivation('You calmed your mind! +2 Mental Strength');
    setTimeout(() => setMotivation(''), 1500);
    setSceneIdx(sceneIdx + 1);
  };

  const handleQuizMiniGameResult = (score) => {
    setShowQuizMiniGame(false);
    if (score === 2) {
      setScore(prev => ({ ...prev, mental: prev.mental + 2, health: prev.health + 2 }));
      setMotivation('Quiz Master! +2 Health, +2 Mental Strength');
    } else if (score === 1) {
      setScore(prev => ({ ...prev, mental: prev.mental + 1 }));
      setMotivation('Nice try! +1 Mental Strength');
    }
    setTimeout(() => {
      setMotivation('');
      setGameOver(true);
    }, 1800);
  };

  const handleRestart = () => {
    setStarted(false);
    setSceneIdx(0);
    setScore(INITIAL_SCORE);
    setShowFact(null);
    setGameOver(false);
    setBadges([]);
    setAvatarEmotion('neutral');
  };

  return (
    <div className="app-container comic-bg">
      {!started ? (
        <div className="intro-screen">
          <h1 className="comic-title">{TITLE}</h1>
          <p className="comic-intro">
            Start your new school year as Alex! Make smart choices, face real-life challenges, and power up your health, confidence, and leadership. Are you ready to be a changemaker?
          </p>
          <div className="avatar-select-title">Choose your avatar:</div>
          <div className="avatar-select-list">
            {avatarOptions.map(opt => (
              <button
                key={opt.key}
                className={`avatar-select-btn${selectedAvatar === opt.key ? ' selected' : ''}`}
                onClick={() => setSelectedAvatar(opt.key)}
              >
                <span role="img" aria-label={opt.label} style={{ fontSize: '2rem' }}>{opt.icon}</span>
                <div style={{ fontSize: '0.9rem' }}>{opt.label}</div>
              </button>
            ))}
          </div>
          <button className="comic-btn" onClick={() => setShowPlayerForm(true)}>
            Start Game
          </button>
          {showPlayerForm && (
            <form className="player-info-form" onSubmit={e => { e.preventDefault(); setStarted(true); }}>
              <div className="player-info-row"><label>Name:</label><input name="name" value={playerName} onChange={e => setPlayerName(e.target.value)} required /></div>
              <div className="player-info-row"><label>Class:</label><input name="class" value={playerClass} onChange={e => setPlayerClass(e.target.value)} required /></div>
              <button className="comic-btn" type="submit" disabled={!playerName || !playerClass}>Continue</button>
            </form>
          )}
        </div>
      ) : gameOver ? (
        <div className="end-screen">
          <h2 className="comic-title">Congratulations, Changemaker!</h2>
          <p className="comic-intro">
            You helped Alex make smart, strong choices and become a leader at school.<br/>
            Remember: Saying "no" to drugs, vaping, and alcohol isn't just about avoiding harm—it's about powering up your health, confidence, and future.<br/>
            <b>Be the change. Inspire your friends. You have the power!</b>
          </p>
          <Badges badges={badges} />
          <button className="comic-btn" onClick={handleRestart}>Play Again</button>
          <StickerAlbum collectedStickers={collectedStickers} />
          <button className="comic-btn" onClick={() => setMuted(!muted)}>
            {muted ? 'Unmute Music' : 'Mute Music'}
          </button>
        </div>
      ) : (
        <>
          <Avatar emotion={avatarEmotion} avatarKey={selectedAvatar} accessories={avatarAccessories} />
          <ScoreBoard score={score} animateScore={animateScore} />
          {motivation && <div className="motivation-pop">{motivation}</div>}
          {showPeerMiniGame ? (
            <PeerPressureMiniGame onResult={handlePeerMiniGameResult} />
          ) : showMiniGame ? (
            <MiniGame statement={MYTH_FACT_QUIZ.statement} answer={MYTH_FACT_QUIZ.answer} onResult={handleMiniGameResult} />
          ) : showStressMiniGame ? (
            <StressBusterMiniGame onResult={handleStressMiniGameResult} />
          ) : showQuizMiniGame ? (
            <QuizBlitzMiniGame onResult={handleQuizMiniGameResult} />
          ) : showFact ? (
            <div className="scene-panel">
              <div className="scene-text"><b>Did you know?</b> {showFact}</div>
            </div>
          ) : (
            <Scene scene={scenes[sceneIdx]} onChoice={handleChoice} />
          )}
        </>
      )}
      <Badges badges={badges} newBadge={newBadge} />
      {showConfetti && <Confetti />}
      {sillyEvent && <SillyEventOverlay event={sillyEvent} onClose={() => setSillyEvent(null)} />}
    </div>
  );
}

export default App;
