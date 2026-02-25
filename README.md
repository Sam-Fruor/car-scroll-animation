# 🏎️ Scroll-Driven Hero Section Animation

**Live Demo:** [View on GitHub Pages](https://sam-fruor.github.io/car-scroll-animation)

This project is a high-performance, scroll-driven frontend animation built for an internship evaluation. It focuses on premium motion quality, hardware-accelerated rendering, and seamless scroll interactions inspired by modern automotive landing pages.

## 🛠️ Mandatory Tech Stack
* **Framework:** Next.js (React.js)
* **Styling:** Tailwind CSS (Handling raw CSS and responsive HTML layouts)
* **Logic:** Vanilla JavaScript & React Hooks (`useEffect`, `useState`)
* **Animation:** GSAP (GreenSock) + ScrollTrigger

## ✨ Core Features & Implementation Details

### 1. The Initial Load Animation (Cinematic Entrance)
To prevent the user from seeing a static page pop in, the initial load utilizes a **GSAP Timeline**. 
* The headline ("WELCOME ITZ FIZZ") uses GSAP's `stagger` property to reveal character-by-character.
* Impact metrics fade in sequentially using subtle ease-out curves (`power3.out`).
* The primary visual (the car) scales into position simultaneously, establishing depth immediately.

### 2. Scroll-Based Animation (The Core Requirement)
Instead of relying on time-based autoplay, the main interaction is directly mapped to the user's scrollbar.
* **Pinning:** I utilized GSAP's `pin: true` on the hero section. This locks the viewport in place while the user scrolls, allowing the car animation to complete fully without the user accidentally scrolling past it into empty space.
* **Interpolation (Scrubbing):** Set to `scrub: 1` to create a slight, buttery delay (momentum) between the user's scroll wheel and the car's movement. This creates a "premium" feel even on rigid mouse wheels.
* **Transformations:** The car animates using X/Y translations, scaling, and Z-axis rotation to simulate a 3D camera push. 

### 3. Motion & Performance Optimizations
To ensure 60fps performance and adhere to the project's strict performance guidelines:
* **Hardware Acceleration:** All animations target the `transform` and `opacity` properties. I applied `will-change-transform` via Tailwind to force the browser to composite the animation on the GPU.
* **No Layout Reflows:** I completely avoided animating properties like `margin`, `width`, or `top`/`left`, which trigger expensive browser layout recalculations on every scroll tick.
* **State-Safe Hydration:** GSAP initialization is wrapped in a `useEffect` and tied to a state variable checking if the CDN scripts have fully loaded, preventing Next.js hydration mismatches.

## 🧠 Architectural Decisions (Plus Points)

**Why no Bootstrap?**
The assignment listed Bootstrap as an optional plus point. However, because I utilized **Tailwind CSS** for a highly customizable, utility-first layout, adding Bootstrap would introduce unnecessary CSS bloat and conflicting methodologies. Sticking strictly to Tailwind demonstrates a leaner, more modern approach to scalable frontend architecture.

**Why no WordPress?**
WordPress is excellent for content-heavy sites, but this assignment requires precise, single-page DOM manipulation. Implementing a static **Next.js** application allows for better raw performance, easier GitHub Pages deployment via Static Export, and tighter integration with React ecosystem tools.

## 🚀 Running Locally

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/Sam-Fruor/car-scroll-animation.git](https://github.com/Sam-Fruor/car-scroll-animation.git)

1. Clone the repository:
   ```bash
   git clone [https://github.com/Sam-Fruor/car-scroll-animation.git](https://github.com/Sam-Fruor/car-scroll-animation.git)
2. Navigate to the directory:
   ```bash
   cd car-scroll-animation

3. Install dependencies (if you haven't already):
   ```bash
   npm install

5. Start the development server:
   ```bash
   npm run dev
   
7. Open http://localhost:3000 in your browser.
