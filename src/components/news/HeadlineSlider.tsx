import useSlide from "../../hooks/useSlide.js"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeadlineSliderProps {
  children: React.ReactNode[]
}

const HeadlineSlider: React.FC<HeadlineSliderProps> = ({ children }) => {
  const { currentSlide, onTouchStart, onTouchMove, onTouchEnd, nextSlide, prevSlide, setSlide } = useSlide()

  return (
    <div className="w-full relative">
      {/* Slides */}
      <div
        className="overflow-hidden rounded-2xl border border-brand-purple/20"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm z-20 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm z-20 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 pt-4">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === i
                ? 'w-8 bg-linear-to-r from-brand-purple to-brand-indigo'
                : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-brand-purple/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeadlineSlider
