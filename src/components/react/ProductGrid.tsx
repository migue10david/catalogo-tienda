import type { Product } from './types';

interface ProductGridProps {
  products: Product[];
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full py-24 text-center">
        <div className="w-24 h-24 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <p className="font-display text-2xl mb-2">No se encontraron productos</p>
        <p className="text-sm text-void/40">Intenta con otros filtros o términos de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <a
          key={product._id}
          href={`/product/${product.slug}`}
          className="card-product animate-enter"
          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-void/5">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-void/10">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                </svg>
              </div>
            )}
            
            {!product.inStock && (
              <div className="absolute inset-0 bg-void/80 flex items-center justify-center">
                <span className="tag tag-sale">Agotado</span>
              </div>
            )}

            <div className="absolute top-4 left-4">
              {product.category && (
                <span className="text-xs uppercase tracking-wider text-void/60 bg-white px-2 py-1">
                  {product.category.title}
                </span>
              )}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                {product.brand && (
                  <p className="text-xs uppercase tracking-wider text-accent-primary font-semibold">{product.brand}</p>
                )}
                <h3 className="font-display text-lg leading-tight truncate">{product.name}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-void/5">
              <span className="font-body font-semibold text-lg">{formatPrice(product.price)}</span>
              <span className={`text-xs px-2 py-1 ${product.inStock ? 'bg-lime text-void' : 'bg-void/10 text-void/60'}`}>
                {product.inStock ? 'Disponible' : 'Agotado'}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}