"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- 1. INITIAL LOAD ANIMATION (Polished) ---
    const tlLoad = gsap.timeline();

    tlLoad.from(".char", {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
    })
    .from(".stat-item", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.8")
    .from(carRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 100, // Starts lower
      duration: 1.5,
      ease: "power3.out",
    }, "-=1");

    // --- 2. THE "WAY TOO GOOD" SCROLL ANIMATION ---
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",      
        end: "+=2500",         // Increased scroll distance for more detail     
        scrub: 1.5,            // Increased scrub for a heavier, smoother feel
        pin: true,             
      }
    });

    // Animate the background glow
    tlScroll.to(".bg-glow", {
      scale: 2.5,
      opacity: 0.8,
      duration: 2,
      ease: "none"
    }, 0);

    // Part the text: Left side moves left, right side moves right
    tlScroll.to(".word-left", { x: "-50vw", opacity: 0, duration: 2, ease: "power1.inOut" }, 0)
            .to(".word-right", { x: "50vw", opacity: 0, duration: 2, ease: "power1.inOut" }, 0);

    // Fade out stats
    tlScroll.to(statsRef.current, { y: 100, opacity: 0, duration: 1 }, 0);

    // The Car Breakthrough (Bulletproofed with fromTo)
    tlScroll.fromTo(carRef.current, 
      { 
        scale: 1, 
        y: 0 
      },
      { 
        scale: 3.5,          
        y: "40vh",           
        duration: 2, 
        ease: "power1.inOut" 
      }, 
      0
    );

    // The Warp Speed Lines Effect (Now properly inside useGSAP)
    tlScroll.to(".speed-line", {
      scale: 3,         // Lines stretch outwards
      opacity: 0.6,     // Fade in slightly
      duration: 1,
      stagger: 0.02,    // slight delay between each line for a chaotic feel
      ease: "power2.in"
    }, 0)
    .to(".speed-line", {
      opacity: 0,       // Fade them back out before the animation ends
      duration: 1,
    }, 1);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
      
      {/* Background Gradient/Glow */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] -z-10" />

      {/* HEADLINE (Rebuilt to allow for parting logic and letter animation) */}
      <h1 ref={headlineRef} className="text-5xl md:text-8xl font-black tracking-[0.3em] text-center uppercase z-30 relative flex justify-center gap-x-8 w-full px-10">
        <span className="word-left flex gap-x-4">
            {"WELCOME".split("").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
        </span>
        <span className="word-right flex gap-x-4">
            {"ITZ".split("").map((char, i) => <span key={`itz-${i}`} className="char inline-block">{char}</span>)}
            {"FIZZ".split("").map((char, i) => <span key={`fizz-${i}`} className="char inline-block">{char}</span>)}
        </span>
      </h1>

      {/* IMPACT METRICS */}
      <div ref={statsRef} className="flex gap-12 mt-12 z-30 relative">
        {[
          { value: "99%", label: "Aerodynamic Efficiency" },
          { value: "2.4s", label: "0-60 mph" },
          { value: "800+", label: "Horsepower" },
        ].map((stat, i) => (
          <div key={i} className="stat-item flex flex-col items-center text-center">
            <span className="text-4xl font-bold text-red-500">{stat.value}</span>
            <span className="text-sm tracking-widest text-zinc-400 mt-2 uppercase">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* WARP SPEED LINES (Added HTML for the lines) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className="speed-line absolute top-1/2 left-1/2 w-[150vw] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center opacity-0"
            style={{ 
              transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* MAIN VISUAL (CAR) */}
      <div className="absolute bottom-10 w-full flex justify-center z-20 pointer-events-none">
        <div ref={carRef} className="w-[80vw] max-w-[1000px]">
          <Image 
            src="/image.jpg" 
            alt="Sports Car" 
            width={1200} 
            height={600} 
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}