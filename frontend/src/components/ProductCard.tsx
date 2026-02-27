interface ProductCardProps {
  image: string;
  category: string;
  description: string;
  badge?: string;
  productId?: bigint;
  productName?: string;
  onOrderClick?: (productId: bigint, productName: string) => void;
}

export default function ProductCard({
  image,
  category,
  description,
  badge,
  productId,
  productName,
  onOrderClick,
}: ProductCardProps) {
  return (
    <article className="group bg-card rounded-3xl overflow-hidden shadow-cozy hover:shadow-warm-lg transition-all duration-400 hover:-translate-y-2 border border-lavender/60">
      {/* Image */}
      <div className="relative overflow-hidden bg-lavender aspect-square">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-rose text-primary-foreground font-handwritten text-sm px-3 py-1 rounded-full shadow-warm">
            {badge}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Decorative stitch line */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 border-t-2 border-dashed border-lavender" />
          <span className="text-rose text-xs">✦</span>
          <div className="h-px flex-1 border-t-2 border-dashed border-lavender" />
        </div>

        <h3 className="font-serif text-xl font-bold text-plum mb-2 group-hover:text-rose transition-colors duration-200">
          {category}
        </h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Tag */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs font-sans text-violet bg-violet/10 px-3 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            100% Handmade
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-sans text-rose bg-rose/10 px-3 py-1 rounded-full">
            Pure Wool
          </span>
        </div>

        {/* Place Order Button */}
        {onOrderClick && productId !== undefined && (
          <button
            onClick={() => onOrderClick(productId, productName ?? category)}
            className="mt-5 w-full bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold text-sm py-2.5 rounded-full transition-all duration-200 shadow-warm hover:shadow-warm-lg"
          >
            Place Order 🛒
          </button>
        )}
      </div>
    </article>
  );
}
