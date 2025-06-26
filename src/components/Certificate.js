import React, { useRef } from "react";
import './Certificate.css';
import { badgeIcons } from './Badges';

function Certificate({ playerInfo, badges }) {
  const certRef = useRef();
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="certificate-area">
      <div className="certificate-comic" ref={certRef}>
        <h2>Certificate of Smart Choices</h2>
        <div className="cert-row"><b>Name:</b> {playerInfo.name}</div>
        <div className="cert-row"><b>Class:</b> {playerInfo.class}</div>
        <div className="cert-row"><b>Section:</b> {playerInfo.section}</div>
        <div className="cert-row"><b>Admission No.:</b> {playerInfo.admission}</div>
        <div className="cert-row"><b>Badges Earned:</b>
          <span className="cert-badges">
            {badges.length === 0 ? 'None' : badges.map(b => (
              <span key={b} className="cert-badge" title={badgeIcons[b]?.name}>
                {badgeIcons[b]?.icon}
              </span>
            ))}
          </span>
        </div>
        <div className="cert-row cert-congrats">Congratulations on being a Smart Choice Champion!</div>
      </div>
      <button className="comic-btn print-btn" onClick={handlePrint}>Print Certificate</button>
    </div>
  );
}

export default Certificate; 