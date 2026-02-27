import ContactForm from './ContactForm';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background yarn-texture">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-handwritten text-2xl text-rose mb-3">We'd love to hear from you</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-plum mb-4">
            Share Your Feedback
          </h2>
          <p className="font-sans text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Whether you've received an order, have a question, or just want to share some warmth — leave us a message!
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-rose/30" />
            <span className="text-rose text-xl">💬</span>
            <div className="h-px w-16 bg-rose/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-plum mb-4">
                Get in Touch
              </h3>
              <p className="font-sans text-plum-light leading-relaxed">
                Every message is read personally. Whether it's a custom order request, a question about our woolens, or just a kind word — we cherish every connection.
              </p>
            </div>

            {/* Email Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-rose/10 border border-rose/25 hover:border-rose/40 transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-rose/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-rose-dark" />
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-plum mb-0.5">Email Us Directly</p>
                <a
                  href="mailto:vanshita310@gmail.com"
                  className="font-sans text-sm text-rose hover:text-rose-dark transition-colors underline underline-offset-2"
                >
                  vanshita310@gmail.com
                </a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {[
                {
                  icon: '🧶',
                  title: 'Custom Orders',
                  desc: 'Have something specific in mind? We love creating one-of-a-kind pieces just for you.',
                },
                {
                  icon: '🎁',
                  title: 'Gift Requests',
                  desc: "Looking for the perfect handmade gift? Tell us the occasion and we'll craft something special.",
                },
                {
                  icon: '⭐',
                  title: 'Share Your Experience',
                  desc: "Received an order? We'd love to hear your feedback and see how we can improve.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-2xl bg-lavender/40 border border-lavender hover:border-rose/30 transition-colors duration-200">
                  <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
                  <div>
                    <p className="font-sans font-bold text-sm text-plum">{title}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Handwritten note */}
            <div className="bg-rose/10 border border-rose/20 rounded-2xl p-5">
              <p className="font-handwritten text-lg text-rose-dark leading-relaxed">
                "Every piece I make carries a little piece of my heart. I hope it brings as much joy to you as it does to me while making it."
              </p>
              <p className="font-sans text-xs text-plum-light mt-2">— Grandma, founder of Knots & Folds</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-3xl p-8 shadow-warm border border-lavender/60">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
