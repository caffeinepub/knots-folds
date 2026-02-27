import HeroSection from '../components/HeroSection';
import ProductShowcase from '../components/ProductShowcase';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
