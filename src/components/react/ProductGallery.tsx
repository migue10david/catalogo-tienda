import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-stone-100 flex items-center justify-center rounded-lg">
        <span className="font-display text-2xl text-stone-400">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        className="aspect-[3/4] bg-stone-100 overflow-hidden rounded-lg cursor-zoom-in relative"
        onClick={() => setIsEnlarged(true)}
      >
        <img 
          src={images[selectedIndex]} 
          alt={`${name} - imagen ${selectedIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-20 h-24 border-2 overflow-hidden rounded-md transition-all duration-200 hover:border-stone-400 ${
                i === selectedIndex ? 'border-stone-800' : 'border-stone-200'
              }`}
            >
              <img 
                src={img} 
                alt={`${name} - miniatura ${i + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsEnlarged(false)}
        >
          <img 
            src={images[selectedIndex]} 
            alt={`${name} - imagen ${selectedIndex + 1}`} 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            type="button"
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsEnlarged(false); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}