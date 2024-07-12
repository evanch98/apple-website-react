import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Model from './components/Model';
import Features from './components/Features';
import Story from './components/Story';

import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Model />
      <Story />
    </main>
  );
};

export default Sentry.withProfiler(App);
