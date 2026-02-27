import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-blush/95 backdrop-blur-sm shadow-cozy border-b border-lavender'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group"
            aria-label="Knots & Folds - Home"
          >
            <img
              src="/assets/image.png"
              alt="Knots & Folds Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-warm transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-xl md:text-2xl font-bold text-plum tracking-tight">
              Knots <span className="text-rose">&</span> Folds
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {[
              { label: 'Our Creations', id: 'products' },
              { label: 'Our Story', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-sans text-sm font-bold text-plum-light hover:text-rose transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="bg-rose text-primary-foreground font-sans text-sm font-bold px-5 py-2 rounded-full hover:bg-rose-dark transition-colors duration-200 shadow-warm"
            >
              Get in Touch
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-plum hover:bg-lavender transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-plum rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-plum rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-plum rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-blush/98 backdrop-blur-sm border-t border-lavender py-4 px-2 space-y-1">
            {[
              { label: 'Our Creations', id: 'products' },
              { label: 'Our Story', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-4 py-3 font-sans text-plum hover:text-rose hover:bg-lavender rounded-lg transition-colors duration-200"
              >
                {label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => scrollTo('contact')}
                className="w-full bg-rose text-primary-foreground font-sans text-sm font-bold px-5 py-2.5 rounded-full hover:bg-rose-dark transition-colors duration-200"
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
