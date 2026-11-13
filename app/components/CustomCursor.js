"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw, FaHeart } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState("default"); // 'button', 'link', 'card'
  const [isClicking, setIsClicking] = useState(false);

  // Mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Sparkles trail
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Detect touch device
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)
    ) {
      setIsTouchDevice(true);
      return;
    }

    setMounted(true);

    let animationFrameId;
    let lastSparkTime = 0;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Directly update inner dot for zero-latency response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add gentle stardust particle every 80ms while moving
      const now = Date.now();
      if (now - lastSparkTime > 75) {
        lastSparkTime = now;
        const newSpark = {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          type: Math.random() > 0.4 ? "paw" : "sparkle",
          rotation: Math.random() * 40 - 20,
          scale: 0.7 + Math.random() * 0.4
        };
        setSparks((prev) => [...prev.slice(-10), newSpark]);

        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
        }, 600);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth lerp loop for the outer trailing ring
    const renderLoop = () => {
      const ease = 0.18; // smooth follow factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Track hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      if (clickable) {
        setIsHovered(true);
        if (target.closest("button, .btn-primary, [role='button']")) {
          setHoverType("button");
        } else if (target.closest("a")) {
          setHoverType("link");
        } else {
          setHoverType("card");
        }
      } else {
        setIsHovered(false);
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Trailing Stardust / Paw Dust Particles */}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="fixed pointer-events-none select-none transition-all duration-700 ease-out inline-flex items-center justify-center"
          style={{
            left: `${spark.x - 7}px`,
            top: `${spark.y - 7}px`,
            transform: `scale(${spark.scale}) rotate(${spark.rotation}deg)`,
            animation: "cursor-spark-fade 0.65s forwards"
          }}
        >
          {spark.type === "paw" ? (
            <FaPaw className="text-pink-400 w-3 h-3 drop-shadow-xs" />
          ) : (
            <HiSparkles className="text-amber-400 w-3 h-3 drop-shadow-xs" />
          )}
        </span>
      ))}

      {/* 2. Outer Smooth Follower Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          willChange: "transform"
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
            isHovered
              ? "w-14 h-14 bg-gradient-to-tr from-pink-500/20 via-rose-400/25 to-amber-300/20 backdrop-blur-[2px] border-2 border-pink-400 shadow-lg shadow-pink-500/30 scale-110"
              : isClicking
              ? "w-7 h-7 bg-pink-500/30 border-2 border-rose-500 scale-90"
              : "w-9 h-9 border border-pink-400/70 bg-pink-100/10 shadow-sm shadow-pink-500/15"
          }`}
        >
          {/* Subtle icon inside ring when hovering */}
          {isHovered && (
            <span className="animate-pulse select-none flex items-center justify-center">
              {hoverType === "button" ? (
                <FaPaw className="text-pink-500 w-3.5 h-3.5" />
              ) : hoverType === "link" ? (
                <FaHeart className="text-rose-400 w-3 h-3" />
              ) : (
                <HiSparkles className="text-amber-400 w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>
      </div>

      {/* 3. Fast Zero-Latency Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          willChange: "transform"
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
            isHovered
              ? "opacity-0 scale-50"
              : isClicking
              ? "w-4 h-4 bg-rose-600 scale-125 shadow-md shadow-rose-500/50"
              : "w-2.5 h-2.5 bg-gradient-to-tr from-pink-500 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
          }`}
        />
      </div>
    </div>
  );
}

