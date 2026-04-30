export type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string;
  category: Category | null;
  brand: string | null;
  inStock: boolean;
}

export type Category = {
  _id: string;
  title: string;
  slug: string;
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: string;
  stockFilter: string;
  sortBy: string;
}

export const INITIAL_FILTERS: FilterState = {
  search: '',
  category: '',
  priceRange: '',
  stockFilter: '',
  sortBy: 'newest',
};

export const ITEMS_PER_PAGE = 6;

export function getPriceRange(range: string): [number, number] {
  if (!range || range === '') return [0, Infinity];
  if (range === '200+') return [200, Infinity];
  const [min, max] = range.split('-').map(Number);
  return [min, max];
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products];

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        (p.brand?.toLowerCase().includes(search)) ||
        (p.category?.title?.toLowerCase().includes(search))
    );
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category?.slug === filters.category);
  }

  if (filters.priceRange) {
    const [min, max] = getPriceRange(filters.priceRange);
    filtered = filtered.filter((p) => p.price >= min && p.price <= max);
  }

  if (filters.stockFilter) {
    filtered = filtered.filter((p) =>
      filters.stockFilter === 'inStock' ? p.inStock : !p.inStock
    );
  }

  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return filtered;
}

export function paginateProducts(
  products: Product[],
  page: number,
  itemsPerPage: number
): { products: Product[]; totalPages: number } {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = products.slice(start, start + itemsPerPage);
  return { products: paginated, totalPages };
}