export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/knots-folds-hero.dim_1440x600.png"
          alt="Knots & Folds woolen goods"
          className="w-full h-full object-cover"
        />
        {/* Pink-purple overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-plum/80 via-violet-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full border-4 border-rose-light/30 animate-float hidden lg:block" />
      <div className="absolute bottom-32 right-32 w-20 h-20 rounded-full border-4 border-blush/20 animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-48 w-12 h-12 rounded-full bg-violet/25 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-2xl">
          {/* Handwritten label */}
          <p className="font-handwritten text-2xl text-rose-light mb-4 animate-fade-up">
            ✦ Handmade with love
          </p>

          {/* Brand Name */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-blush leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Knots{' '}
            <span className="text-rose-light italic">&</span>
            {' '}Folds
          </h1>

          {/* Tagline */}
          <p className="font-sans text-lg sm:text-xl text-blush/90 leading-relaxed mb-10 max-w-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Every stitch tells a story. Lovingly crafted woolen toys, headbands, and accessories — made by hand, made with heart.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center gap-2 bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-warm-lg hover:shadow-warm hover:-translate-y-0.5"
            >
              Explore Our Creations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 bg-blush/15 hover:bg-blush/25 text-blush font-sans font-bold text-base px-8 py-4 rounded-full border-2 border-blush/40 hover:border-blush/60 transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '100%', label: 'Handmade' },
              { value: '♥', label: 'Made with Love' },
              { value: '∞', label: 'Unique Pieces' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-serif text-2xl font-bold text-rose-light">{value}</div>
                <div className="font-sans text-xs text-blush/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="oklch(0.98 0.012 340)"/>
        </svg>
      </div>
    </section>
  );
}
