import { useState } from 'react';
import ProductCard from './ProductCard';
import OrderForm from './OrderForm';

const staticProducts = [
  {
    image: '/assets/generated/wool-toy.dim_400x400.png',
    category: 'Woolen Toys',
    description: 'Adorable handcrafted stuffed animals and toys made from the softest wool. Perfect gifts for little ones that will be treasured for years.',
    badge: 'Bestseller',
  },
  {
    image: '/assets/generated/wool-headband.dim_400x400.png',
    category: 'Knitted Headbands',
    description: 'Cozy and stylish headbands knitted with care. Available in a variety of colors and patterns to keep you warm and fashionable.',
    badge: 'New',
  },
  {
    image: '/assets/generated/wool-accessories.dim_400x400.png',
    category: 'Woolen Accessories',
    description: 'Scarves, mittens, keychains, and more — each piece uniquely crafted with love. Small details that make a big difference.',
  },
];

export default function ProductShowcase() {
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<bigint | undefined>(undefined);
  const [selectedProductName, setSelectedProductName] = useState<string | undefined>(undefined);

  const handleOrderClick = (productId: bigint, productName: string) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setOrderFormOpen(true);
  };

  const handleOpenOrderForm = () => {
    setSelectedProductId(undefined);
    setSelectedProductName(undefined);
    setOrderFormOpen(true);
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-background yarn-texture">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-handwritten text-2xl text-rose mb-3">What we make</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-plum mb-4">
            Our Woolen Creations
          </h2>
          <p className="font-sans text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each piece is lovingly knitted by hand using premium wool. No two items are exactly alike — that's the beauty of handmade.
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-rose/30" />
            <span className="text-rose text-xl">🧶</span>
            <div className="h-px w-16 bg-rose/30" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticProducts.map((product) => (
            <ProductCard
              key={product.category}
              {...product}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="font-handwritten text-xl text-plum-light mb-4">
            Looking for something special?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenOrderForm}
              className="inline-flex items-center gap-2 bg-rose text-primary-foreground font-sans font-bold text-sm px-8 py-3.5 rounded-full hover:bg-rose-dark transition-all duration-200 shadow-warm hover:shadow-warm-lg"
            >
              Place an Order
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-violet text-accent-foreground font-sans font-bold text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-cozy hover:shadow-warm"
            >
              Request a Custom Order
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      <OrderForm
        open={orderFormOpen}
        onClose={() => setOrderFormOpen(false)}
        preselectedProductId={selectedProductId}
        preselectedProductName={selectedProductName}
      />
    </section>
  );
}
