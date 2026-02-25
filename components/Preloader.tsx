"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Animate the counter from 0 to 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.5, // 2.5 seconds to load
      ease: "power1.inOut",
      onUpdate: function () {
        // Update the React state with the current GSAP value
        setProgress(Math.round(this.targets()[0].val));
      },
    })
    // 2. Slide the loader up and out of the way
    .to(loaderRef.current, {
      yPercent: -100, // Slides up completely
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.2, // Tiny pause at 100% before opening
    });

  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center text-white"
    >
      <div className="flex flex-col items-center">
        {/* The 0-100% Counter */}
        <span className="text-7xl md:text-9xl font-black tracking-tighter text-transparent w-full text-center" 
              style={{ WebkitTextStroke: "2px white" }}>
          {progress}%
        </span>
        
        {/* Sleek loading bar beneath the text */}
        <div className="w-64 h-[2px] bg-zinc-800 mt-6 overflow-hidden">
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
}