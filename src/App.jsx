import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Model from './components/Model';
import Features from './components/Features';

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

export default App;
