import Providers from '@/components/Providers';
import Background from '@/components/ui/Background';
import Effects from '@/components/effects/Effects';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import FeaturedProject from '@/components/FeaturedProject';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <Providers>
      <Background />
      <Effects />
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <TechMarquee />
        <FeaturedProject />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
