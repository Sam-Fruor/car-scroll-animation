"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.quickTo is the most performant way to track mouse movement
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Hide the default Windows/Mac cursor globally */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* The Custom Cursor Element */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border-2 border-red-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 backdrop-invert"
      />
      {/* Optional: Add a tiny solid dot in the center for precision */}
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
           // We map this inline to perfectly sync with the mouse without the delay of the outer ring
           transform: 'translate(calc(var(--x) - 50%), calc(var(--y) - 50%))'
        }}
        ref={(el) => {
            if (!el) return;
            window.addEventListener('mousemove', (e) => {
                el.style.setProperty('--x', e.clientX + 'px');
                el.style.setProperty('--y', e.clientY + 'px');
            })
        }}
      />
    </>
  );
}