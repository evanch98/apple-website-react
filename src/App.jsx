import Model from './components/Model';
import Features from './components/Features';
import Story from './components/Story';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Navbar from './components/Nav';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <Features />
      <Model />
      <Story />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default App;
