import { SiInstagram, SiFacebook, SiPinterest } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'knots-and-folds');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-plum text-blush">
      {/* Top wave */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 0L60 13.3C120 26.7 240 53.3 360 60C480 66.7 600 53.3 720 46.7C840 40 960 40 1080 43.3C1200 46.7 1320 53.3 1380 56.7L1440 60V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="oklch(0.98 0.012 340)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/image.png"
                alt="Knots & Folds Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-rose-light/40"
              />
              <span className="font-serif text-xl font-bold text-blush">
                Knots <span className="text-rose-light">&</span> Folds
              </span>
            </div>
            <p className="font-sans text-sm text-blush/70 leading-relaxed mb-5">
              Handcrafted woolen goods made with love, patience, and the finest wool. Every stitch tells a story.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: SiInstagram, label: 'Instagram', href: '#' },
                { Icon: SiFacebook, label: 'Facebook', href: '#' },
                { Icon: SiPinterest, label: 'Pinterest', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-blush/10 hover:bg-rose/50 flex items-center justify-center text-blush/70 hover:text-blush transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-blush mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Creations', id: 'products' },
                { label: 'Our Story', id: 'about' },
                { label: 'Get in Touch', id: 'contact' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="font-sans text-sm text-blush/70 hover:text-rose-light transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-rose-light/50 group-hover:bg-rose-light transition-colors" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline / Promise */}
          <div>
            <h4 className="font-serif text-base font-bold text-blush mb-4">Our Promise</h4>
            <div className="space-y-3">
              {[
                '🌿 100% natural wool',
                '✋ Entirely handmade',
                '💜 Crafted with love',
                '🎁 Unique, one-of-a-kind pieces',
              ].map((item) => (
                <p key={item} className="font-sans text-sm text-blush/70">{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blush/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-blush/50">
            © {year} Knots & Folds. All rights reserved.
          </p>
          <p className="font-sans text-xs text-blush/50 flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3 h-3 text-rose-light fill-rose-light" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-light hover:text-blush transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
