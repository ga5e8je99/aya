"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WalkingCat.module.css";

/**
 * أنيميشن القطة الشيرازي الأنيقة التي تتجول في الشاشة
 * تمر كل 30 ثانية (أو حسب الإعدادات) عبر أسفل الشاشة
 */
export default function WalkingCat({
  intervalMs = 30000,
  walkMs = 12000,
  initialDelayMs = 3000,
  size = 145,
  bottom = 12,
}) {
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState("right");
  const busy = useRef(false);
  const nextDir = useRef("right");

  useEffect(() => {
    // احترام تفضيل المستخدم لتقليل الحركة
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timer;
    const start = () => {
      if (busy.current || (typeof document !== "undefined" && document.hidden)) return;
      busy.current = true;
      setDir(nextDir.current);
      nextDir.current = nextDir.current === "right" ? "left" : "right";
      setWalking(true);
    };

    const first = setTimeout(() => {
      start();
      timer = setInterval(start, intervalMs);
    }, initialDelayMs);

    return () => {
      clearTimeout(first);
      if (timer) clearInterval(timer);
    };
  }, [intervalMs, initialDelayMs]);

  if (!walking) return null;

  return (
    <div
      aria-hidden="true"
      className={`${styles.walker} ${dir === "right" ? styles.toRight : styles.toLeft}`}
      style={{
        width: size,
        bottom,
        "--walk-ms": `${walkMs}ms`,
        "--cat-w": `${size}px`,
      }}
      onAnimationEnd={(e) => {
        // نتجاهل أنيميشن الأطراف والذيل ونلتقط فقط نهاية رحلة المشي الكبرى
        if (e.target !== e.currentTarget) return;
        busy.current = false;
        setWalking(false);
      }}
    >
      <div className={dir === "left" ? styles.flip : undefined}>
        <PersianCat />
      </div>
    </div>
  );
}

function PersianCat() {
  return (
    <svg viewBox="0 0 220 170" className={styles.svg} role="img" aria-label="Walking Persian Cat">
      <g
        stroke="#cfc9dc"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* الذيل */}
        <g className={styles.tail}>
          <path d="M52 92 C20 92 8 66 22 42" fill="none" stroke="#cfc9dc" strokeWidth="22" />
          <path d="M52 92 C20 92 8 66 22 42" fill="none" stroke="#fff" strokeWidth="18" />
        </g>

        {/* الأرجل الخلفية */}
        <rect className={styles.legA} x="58" y="108" width="14" height="40" rx="7" fill="#f1eef6" />
        <rect className={styles.legB} x="78" y="110" width="14" height="38" rx="7" fill="#fff" />

        {/* الجسم */}
        <ellipse cx="88" cy="94" rx="50" ry="33" fill="#fff" />
        <path d="M60 112 q6 8 12 0 M80 118 q6 8 12 0 M100 114 q6 8 12 0" fill="none" stroke="#e3deee" />

        {/* الأرجل الأمامية */}
        <rect className={styles.legB} x="106" y="110" width="14" height="38" rx="7" fill="#f1eef6" />
        <rect className={styles.legA} x="124" y="108" width="15" height="40" rx="7" fill="#fff" />

        <g className={styles.head}>
          {/* فرو الخدود الممتلئ */}
          <ellipse cx="108" cy="74" rx="15" ry="13" fill="#fff" />
          <ellipse cx="164" cy="74" rx="15" ry="13" fill="#fff" />
          {/* الأذنان */}
          <path d="M108 52 L108 16 L138 34 Z" fill="#fff" />
          <path d="M164 52 L164 16 L134 34 Z" fill="#fff" />
          <path d="M112 36 L112 25 L125 33 Z" fill="#f7c6d0" stroke="none" />
          <path d="M160 36 L160 25 L147 33 Z" fill="#f7c6d0" stroke="none" />
          {/* الرأس الدائري */}
          <circle cx="136" cy="62" r="34" fill="#fff" />

          {/* العيون البراقة الواسعة */}
          <g className={styles.eyes} stroke="none">
            <circle cx="124" cy="60" r="6" fill="#c8741f" />
            <circle cx="124" cy="60" r="3.6" fill="#2b1c12" />
            <circle cx="126" cy="58" r="1.4" fill="#fff" />
            <circle cx="148" cy="60" r="6" fill="#c8741f" />
            <circle cx="148" cy="60" r="3.6" fill="#2b1c12" />
            <circle cx="150" cy="58" r="1.4" fill="#fff" />
          </g>

          {/* وجه الشيرازي الكيوت المفلطح */}
          <ellipse cx="136" cy="74" rx="9" ry="6" fill="#faf7fc" stroke="#e3deee" strokeWidth="1.5" />
          <path d="M132 69 h8 l-4 4 z" fill="#f08aa0" stroke="none" />
          <path
            d="M136 73 v2 M136 75 q-3 3 -6 0 M136 75 q3 3 6 0"
            fill="none"
            stroke="#6b5a66"
            strokeWidth="1.4"
          />
          {/* الشوارب اللطيفة */}
          <g stroke="#9a92a8" strokeWidth="1.3">
            <path d="M126 72 l-18 -3 M126 75 l-18 3" />
            <path d="M146 72 l18 -3 M146 75 l18 3" />
          </g>

          {/* الطوق الأنيق والجرس الذهبي */}
          <path d="M110 86 Q136 104 162 86" fill="none" stroke="#f43f5e" strokeWidth="5" />
          <circle cx="136" cy="98" r="5.5" fill="#ffd93b" stroke="#e0b400" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}
