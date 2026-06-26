import Providers from '@/components/Providers';
import SkipLink from '@/components/ui/SkipLink';
import Background from '@/components/ui/Background';
import Effects from '@/components/effects/Effects';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import FeaturedProject from '@/components/FeaturedProject';
import Stats from '@/components/Stats';
import Projects from '@/components/Projects';
import Impact from '@/components/Impact';
import GitHubActivity from '@/components/GitHubActivity';
import About from '@/components/About';
import Journey from '@/components/Journey';
import RecruiterFit from '@/components/RecruiterFit';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <Providers>
      <SkipLink />
      <Background />
      <Effects />
      <Navbar />
      <main id="top" tabIndex={-1} className="relative outline-none">
        <Hero />
        <TechMarquee />
        <FeaturedProject />
        <Stats />
        <Projects />
        <Impact />
        <GitHubActivity />
        <About />
        <Journey />
        <RecruiterFit />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
