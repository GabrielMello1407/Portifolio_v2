import Providers from '@/components/Providers';
import Background from '@/components/ui/Background';
import Effects from '@/components/effects/Effects';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import FeaturedProject from '@/components/FeaturedProject';
import Stats from '@/components/Stats';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import About from '@/components/About';
import Journey from '@/components/Journey';
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
        <Stats />
        <Projects />
        <GitHubActivity />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
