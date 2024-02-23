import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const PIECES = 16; // 4x4 grid
const ROWS = 4;
const COLS = 4;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0); // Force re-render of pieces
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevSlide();
    if (e.key === 'ArrowRight') handleNextSlide();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const createShatteredPieces = (imageUrl: string) => {
    const pieces: JSX.Element[] = [];
    const pieceWidth = 100 / COLS;
    const pieceHeight = 100 / ROWS;

    for (let i = 0; i < PIECES; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const delay = Math.random() * 0.3;
      const rotation = (Math.random() - 0.5) * 720;

      pieces.push(
        <div
          key={`${i}-${key}`}
          className={`shattered-piece ${direction === 'right' ? 'assemble-right' : 'assemble-left'}`}
          style={{
            width: `${pieceWidth}%`,
            height: `${pieceHeight}%`,
            left: `${col * pieceWidth}%`,
            top: `${row * pieceHeight}%`,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${-col * 100}% ${-row * 100}%`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            animationDelay: `${delay}s`,
            '--rotation': `${rotation}deg`,
          } as React.CSSProperties}
        />
      );
    }
    return pieces;
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setKey(prev => prev + 1); // Force re-render of pieces
    setCurrentSlide((prev) => (prev + 1) % project.slides.length);
    setTimeout(() => setIsAnimating(false), 1100);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setKey(prev => prev + 1); // Force re-render of pieces
    setCurrentSlide((prev) => (prev - 1 + project.slides.length) % project.slides.length);
    setTimeout(() => setIsAnimating(false), 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
         onClick={onClose}>
      <div className="relative w-[60%] h-[60%] mx-auto"
           onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors z-50"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Carousel container */}
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-black" ref={containerRef}>
          <div className="absolute inset-0">
            <img
              src={project.slides[currentSlide]}
              alt={project.title}
              className="w-full h-full object-cover opacity-0"
            />
            <div className="absolute inset-0" key={`container-${key}`}>
              {createShatteredPieces(project.slides[currentSlide])}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            disabled={isAnimating}
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {project.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentSlide) {
                    setDirection(index > currentSlide ? 'right' : 'left');
                    setKey(prev => prev + 1);
                    setCurrentSlide(index);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}