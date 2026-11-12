import BackToTop from "@/components/BackToTop/BackToTop";
import BrandStrip from "@/components/BrandStrip/BrandStrip";
import Contact from "@/components/Contact/Contact";
import Experience from "@/components/Experience/Experience";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <BrandStrip />
        <Projects />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
