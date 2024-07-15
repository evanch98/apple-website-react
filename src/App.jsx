import Hero from './components/HeroSection';
import Model from './components/Model';
import Features from './components/Features';
import Story from './components/Story';
import HowItWorks from './components/HowItWorks';

import * as Sentry from '@sentry/react';
import Footer from './components/Footer';
import Navbar from './components/Nav';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Model />
      <Story />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
