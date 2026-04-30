interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-void/10">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-3 bg-transparent border border-void/10 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-void hover:bg-void hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-void disabled:hover:border-void/10"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Anterior
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              page === currentPage 
                ? 'bg-void text-white' 
                : 'bg-transparent border border-void/10 hover:border-void'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-3 bg-transparent border border-void/10 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-void hover:bg-void hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-void disabled:hover:border-void/10"
      >
        Siguiente
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}