import { useState, useMemo, useEffect } from 'react';
import type { Product, Category, FilterState } from './types';
import { ITEMS_PER_PAGE, filterProducts, paginateProducts, INITIAL_FILTERS } from './types';
import { SearchBar } from './SearchBar';
import { Filters } from './Filters';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';

interface CatalogProps {
  products: Product[];
  categories: Category[];
}

export function Catalog({ products, categories }: CatalogProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  const { products: paginatedProducts, totalPages } = useMemo(() => {
    return paginateProducts(filteredProducts, currentPage, ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const resultsShowing = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
    return filteredProducts.length === 0 ? '0' : `${start}-${end}`;
  }, [filteredProducts.length, currentPage]);

  if (!isClient) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 p-4 bg-black/5">
          <input type="text" disabled placeholder="Cargando..." className="flex-1 border-none bg-transparent outline-none" />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 p-3 bg-black/5 min-w-[120px]"></div>
          <div className="flex items-center gap-3 p-3 bg-black/5 min-w-[120px]"></div>
          <div className="flex items-center gap-3 p-3 bg-black/5 min-w-[120px]"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-black/5 animate-pulse aspect-[4/5]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={filters.search} onChange={(search) => setFilters({ ...filters, search })} />
      
      <Filters filters={filters} categories={categories} onChange={handleFilterChange} />

      {filteredProducts.length === 0 && (
        <button 
          type="button" 
          onClick={handleReset}
          className="self-start btn-secondary"
        >
          Limpiar filtros
        </button>
      )}

      <p className="text-sm text-black/40">
        Mostrando <span className="text-ink font-medium">{resultsShowing}</span> de {filteredProducts.length} productos
      </p>

      <ProductGrid products={paginatedProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}