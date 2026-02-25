"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Create an animation that moves the header up by 100% (hidden)
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1); // Set it to its final "visible" state immediately

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // self.direction: 1 is scrolling down, -1 is scrolling up
        if (self.direction === -1) {
          showAnim.play(); // Bring header down
        } else if (self.direction === 1 && self.scroll() > 50) {
          showAnim.reverse(); // Push header up
        }
      }
    });
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-zinc-950/40 border-b border-white/5"
    >
      <div className="text-xl font-black tracking-[0.2em] uppercase">FIZZ</div>
      
      <nav className="hidden md:flex gap-10 text-xs font-bold tracking-[0.15em] text-zinc-400 uppercase">
        <a href="#" className="hover:text-white transition-colors duration-300">Models</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Innovation</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Heritage</a>
      </nav>
      
      <button className="text-xs font-bold tracking-[0.15em] uppercase px-8 py-3 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors duration-300">
        Pre-Order
      </button>
    </header>
  );
}