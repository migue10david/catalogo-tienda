import type { ChangeEvent } from 'react';
import type { Category, FilterState } from './types';

interface FiltersProps {
  filters: FilterState;
  categories: Category[];
  onChange: (filters: FilterState) => void;
}

export function Filters({ filters, categories, onChange }: FiltersProps) {
  const handleChange = (key: keyof FilterState) => (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, [key]: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative">
        <select
          value={filters.category}
          onChange={handleChange('category')}
          className="appearance-none px-4 py-3 bg-white border border-void/10 text-sm font-medium hover:border-void/30 focus:outline-none focus:border-accent-primary transition-colors cursor-pointer pr-10 min-w-[140px]"
        >
          <option value="">Categoría</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>{cat.title}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-void/40" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      <div className="relative">
        <select
          value={filters.priceRange}
          onChange={handleChange('priceRange')}
          className="appearance-none px-4 py-3 bg-white border border-void/10 text-sm font-medium hover:border-void/30 focus:outline-none focus:border-accent-primary transition-colors cursor-pointer pr-10 min-w-[140px]"
        >
          <option value="">Precio</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-void/40" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      <div className="relative">
        <select
          value={filters.stockFilter}
          onChange={handleChange('stockFilter')}
          className="appearance-none px-4 py-3 bg-white border border-void/10 text-sm font-medium hover:border-void/30 focus:outline-none focus:border-accent-primary transition-colors cursor-pointer pr-10 min-w-[140px]"
        >
          <option value="">Stock</option>
          <option value="inStock">Disponible</option>
          <option value="outOfStock">Agotado</option>
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-void/40" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      <div className="relative">
        <select
          value={filters.sortBy}
          onChange={handleChange('sortBy')}
          className="appearance-none px-4 py-3 bg-white border border-void/10 text-sm font-medium hover:border-void/30 focus:outline-none focus:border-accent-primary transition-colors cursor-pointer pr-10 min-w-[160px]"
        >
          <option value="newest">Más recientes</option>
          <option value="price-asc">Precio: menor</option>
          <option value="price-desc">Precio: mayor</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-void/40" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
}