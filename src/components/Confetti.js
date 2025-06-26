import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

function Confetti({ active }) {
  const didRun = useRef(false);
  useEffect(() => {
    if (active && !didRun.current) {
      didRun.current = true;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => { didRun.current = false; }, 2000);
    }
  }, [active]);
  return null;
}

export default Confetti; 