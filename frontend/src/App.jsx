// ── App.jsx ──────────────────────────────────────────────────
// Root component. Think of this as the table of contents —
// it imports every section component and stacks them in order.
// All data flows from config.js → components. Nothing is hard-coded here.
// ──────────────────────────────────────────────────────────────
import NeuralBackground from "./components/NeuralBackground";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Ticker     from "./components/Ticker";
import Skills     from "./components/Skills";
import Experience from "./components/Experience";
import Projects   from "./components/Projects";
import About      from "./components/About";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";


export default function App() {
  return (
    <>
      {/* Fixed navigation — always on top */}
      <Navbar />
      <NeuralBackground />
      {/* Page sections in order */}
      <main>
        <Hero />
        <Ticker />
        <Skills />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
