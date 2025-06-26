import React from "react";
import './StickerAlbum.css';
import { stickers } from './stickers';

function StickerAlbum({ collectedStickers }) {
  return (
    <div className="sticker-album-comic">
      <h3>Sticker Album</h3>
      <div className="sticker-album-list">
        {stickers.map(s => (
          <div key={s.key} className={`sticker-album-item${collectedStickers.includes(s.key) ? ' collected' : ''}`}>
            <span className="sticker-album-emoji" role="img" aria-label={s.name}>{s.icon}</span>
            <div className="sticker-album-name">{s.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerAlbum; 