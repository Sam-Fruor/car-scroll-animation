import ScrollHero from "../components/ScrollHero";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="w-full">
      <Preloader />
      <CustomCursor />
      <Header />

      <ScrollHero />
      
      <section className="h-screen w-full flex items-center justify-center bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-3xl text-center px-6">
          <h2 className="text-4xl font-bold mb-6">The Journey Continues</h2>
          <p className="text-zinc-400 leading-relaxed">
            This section appears naturally after the scroll-pinned animation finishes. 
          </p>
        </div>
      </section>
    </main>
  );
}