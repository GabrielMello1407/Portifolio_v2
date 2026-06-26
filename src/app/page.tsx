import Providers from '@/components/Providers';
import Background from '@/components/ui/Background';
import Effects from '@/components/effects/Effects';
import ScrollProgress from '@/components/ui/ScrollProgress';
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
      <Background />
      <Effects />
      <ScrollProgress />
      <Navbar />
      <main id="top" className="relative">
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
