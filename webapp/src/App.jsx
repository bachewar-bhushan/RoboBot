import { useEffect } from 'react';
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import { useStateStore } from "./zustand/useStateStore";

function App() {
  const { setActiveSection, activeSection } = useStateStore();
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - sectionHeight / 3 &&
          window.scrollY < sectionTop + sectionHeight - sectionHeight / 3
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, setActiveSection]);

  return (
    <>
       <Navbar />
       <Home />
    </>
  )
}

export default App
