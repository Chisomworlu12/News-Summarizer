import useSlide from "../hooks/useSlide";


function HeadlineSlider({children}) {
  
  const {currentSlide, onTouchStart, onTouchMove, onTouchEnd, nextSlide, prevSlide} = useSlide();

  function onSetCurrentSlide(i) {
    while (currentSlide !== i) {
      if (currentSlide < i) {
        nextSlide();
      } else {
        prevSlide();
      }
  }
}
    return (
        <div className="w-full mb-4 relative">
           
            <div className="overflow-hidden rounded-lg border-b-4 border-blue-600" onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
                
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {children.map((child, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      {child}
                    </div>
                  ))}
                </div>
            </div>

            
            <button
              onClick={prevSlide}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full z-20 transition-all flex items-center justify-center"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full z-20 transition-all flex items-center justify-center"
              aria-label="Next slide"
            >
              →
            </button>

           
            <div className="flex justify-center gap-2 py-4">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={onSetCurrentSlide.bind(null, i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'bg-blue-600 w-8' : 'bg-gray-400 w-2'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
        </div>
    );
}

export default HeadlineSlider;