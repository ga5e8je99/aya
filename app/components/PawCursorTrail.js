"use client";

import { useEffect, useState } from "react";

export default function PawCursorTrail() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    let lastTime = 0;
    const throttleMs = 90; // Only drop a paw every 90ms for performance

    const handlePointerMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const paw = document.createElement("div");
      paw.className = "fixed pointer-events-none z-50 text-xs select-none transition-all duration-700 ease-out";
      paw.style.left = `${e.clientX - 6}px`;
      paw.style.top = `${e.clientY - 6}px`;
      paw.style.opacity = "0.75";
      paw.style.transform = `scale(${0.7 + Math.random() * 0.4}) rotate(${Math.floor(Math.random() * 40 - 20)}deg)`;
      
      paw.innerHTML = Math.random() > 0.4 ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="#F472B6"><circle cx="12" cy="14" r="5"/><circle cx="6" cy="8" r="2.5"/><circle cx="10" cy="5" r="2.5"/><circle cx="14" cy="5" r="2.5"/><circle cx="18" cy="8" r="2.5"/></svg>` : `<svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24"><polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9"/></svg>`;

      document.body.appendChild(paw);

      // Animate and remove
      requestAnimationFrame(() => {
        paw.style.transform += " translateY(-14px) scale(0.6)";
        paw.style.opacity = "0";
      });

      setTimeout(() => {
        paw.remove();
      }, 700);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled]);

  return null;
}

