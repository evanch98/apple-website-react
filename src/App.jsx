import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Model from './components/Model';
import Features from './components/Features';

import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Model />
    </main>
  );
};

export default Sentry.withProfiler(App);
