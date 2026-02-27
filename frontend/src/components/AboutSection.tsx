export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-lavender/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative background shape */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-rose/10 rounded-3xl" />
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-violet/10 rounded-3xl" />

            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
              <img
                src="/assets/generated/knots-folds-about.dim_600x400.png"
                alt="Grandmother knitting woolen goods"
                className="w-full h-auto object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-blush/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-warm">
                <p className="font-handwritten text-lg text-rose">Est. with love ♥</p>
                <p className="font-sans text-xs text-plum-light">Every stitch, a memory</p>
              </div>
            </div>

            {/* Floating yarn ball decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose rounded-full lg:flex items-center justify-center shadow-warm text-2xl hidden">
              🧶
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <p className="font-handwritten text-2xl text-rose mb-3">Our Story</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-plum mb-6 leading-tight">
              Knitted with{' '}
              <span className="text-rose italic">Grandma's</span>
              {' '}Love
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-rose/40" />
              <span className="text-rose">✦</span>
              <div className="h-px w-12 bg-rose/40" />
            </div>

            <div className="space-y-4 font-sans text-base text-plum-light leading-relaxed">
              <p>
                Knots & Folds was born from a lifetime of love, patience, and the gentle rhythm of knitting needles. What started as a grandmother's quiet hobby — crafting soft toys for grandchildren and warm headbands for neighbors — grew into something truly special.
              </p>
              <p>
                Every piece you find here carries the warmth of hands that have knitted through decades of seasons. We use only the finest wool, chosen for its softness and durability, because we believe the things we make should last — just like the memories they create.
              </p>
              <p>
                No machines, no shortcuts. Just time, care, and the kind of craftsmanship that only comes from doing something with your whole heart.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🌿', title: 'Natural Materials', desc: 'Premium, ethically sourced wool' },
                { icon: '✋', title: 'Handcrafted', desc: 'Every stitch made by hand' },
                { icon: '💜', title: 'Made with Love', desc: 'Family tradition & care' },
                { icon: '🎁', title: 'Unique Pieces', desc: 'No two items are the same' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-blush/60 border border-lavender">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-sans font-bold text-sm text-plum">{title}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
