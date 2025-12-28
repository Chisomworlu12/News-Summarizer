
import { useEffect, useReducer, useRef } from "react";
const initialState = {
    currentSlide: 0,
    touchStart: null,
    touchEnd: null,
    slideCount: 4
};

const reducer = (state, action) => {
    switch(action.type){
    case 'NEXT_SLIDE':
        return {...state, currentSlide: (state.currentSlide + 1) % state.slideCount};
    case 'PREV_SLIDE':
        return {...state, currentSlide: (state.currentSlide - 1 + state.slideCount) % state.slideCount};
    case 'SET_TOUCH_START':
        return {...state, touchStart: action.payload};
    case 'SET_TOUCH_END':
        return {...state, touchEnd: action.payload};
    default:
        return state;
    }
}

function useSlide() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {currentSlide, touchStart, touchEnd} = state
    
      const timerRef = useRef(null);
    
        const nextSlide = () => {
         dispatch({type: 'NEXT_SLIDE', payload: null});
        };
    
        const prevSlide = () => {
          dispatch({type: 'PREV_SLIDE', payload: null});
        };

    
    
        useEffect(() => {
       
        timerRef.current = setInterval(() => {
          nextSlide();
        }, 5000); 
    
       
        return () => clearInterval(timerRef.current);
      }, [currentSlide]);
    
    
      const minSwipeDistance = 50;
    
      const onTouchStart = (e) => {
        dispatch({type: 'SET_TOUCH_END', payload: null});
        dispatch({type: 'SET_TOUCH_START', payload: e.targetTouches[0].clientX});
      };
    
      const onTouchMove = (e) => dispatch({type: 'SET_TOUCH_END', payload: e.targetTouches[0].clientX});
    
      const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
    
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
      };
    return (
        {
            currentSlide,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            nextSlide,
            prevSlide
        }
    )
}

export default useSlide
