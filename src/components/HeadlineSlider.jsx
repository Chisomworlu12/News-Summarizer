import { useEffect, useRef, useState } from "react";

function HeadlineSlider({children}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideCount = children.length || 4;

  const timerRef = useRef(null);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    };

    useEffect(() => {
   
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000); 

   
    return () => clearInterval(timerRef.current);
  }, [currentSlide]);


  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };
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
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-400 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
        </div>
    );
}

export default HeadlineSlider;