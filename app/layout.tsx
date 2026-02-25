import "./globals.css";
import SmoothScrolling from "../components/SmoothScrolling";

export const metadata = {
  title: "Premium Scroll Animation",
  description: "GSAP & Lenis Scroll-Driven Hero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {}
            }
          }
        `}} />
      </head>
      <body className="bg-zinc-950 text-white overflow-x-hidden antialiased">
        {/* Everything inside here now glides perfectly */}
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}