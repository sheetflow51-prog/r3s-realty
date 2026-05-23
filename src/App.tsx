import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/HeroSlides";
import Footer from "./components/layout/Footer";
import WhatsAppFloat from "./components/layout/WhatsAppFloat";
import LoadingScreen from "./components/shared/LoadingScreen";

const About = lazy(() => import("./components/sections/About"));
const Properties = lazy(() => import("./components/sections/Properties"));
const Gallery = lazy(() => import("./components/sections/Gallery"));
const LandBank = lazy(() => import("./components/sections/LandBank"));
const WhyHere = lazy(() => import("./components/sections/WhyHere"));
const Investment = lazy(() => import("./components/sections/Investment"));
const BookVisit = lazy(() => import("./components/sections/BookVisit"));
const FAQSection = lazy(() => import("./components/sections/FAQSection"));
const MobileBar = lazy(() => import("./components/layout/MobileBar"));

const Fallback = () => (
  <div className="h-32 animate-pulse bg-bg-2" />
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <div
        className="min-h-screen bg-bg text-text"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<Fallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <Properties />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <LandBank />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <WhyHere />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <Investment />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <BookVisit />
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <FAQSection />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
        <Suspense fallback={null}>
          <MobileBar />
        </Suspense>
      </div>
    </>
  );
}

export default App;
