import { useEffect, useReducer, useRef } from "react"

interface SlideState {
  currentSlide: number
  touchStart: number | null
  touchEnd: number | null
  slideCount: number
}

type SlideAction =
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'SET_SLIDE'; payload: number }
  | { type: 'SET_TOUCH_START'; payload: number }
  | { type: 'SET_TOUCH_END'; payload: number | null }

const initialState: SlideState = {
  currentSlide: 0,
  touchStart: null,
  touchEnd: null,
  slideCount: 4,
}

const reducer = (state: SlideState, action: SlideAction): SlideState => {
  switch (action.type) {
    case 'NEXT_SLIDE':
      return { ...state, currentSlide: (state.currentSlide + 1) % state.slideCount }
    case 'PREV_SLIDE':
      return { ...state, currentSlide: (state.currentSlide - 1 + state.slideCount) % state.slideCount }
    case 'SET_SLIDE':
      return { ...state, currentSlide: action.payload % state.slideCount }
    case 'SET_TOUCH_START':
      return { ...state, touchStart: action.payload, touchEnd: null }
    case 'SET_TOUCH_END':
      return { ...state, touchEnd: action.payload }
    default:
      return state
  }
}

function useSlide() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentSlide, touchStart, touchEnd } = state
  const timerRef = useRef<number | null>(null)

  const nextSlide = () => dispatch({ type: 'NEXT_SLIDE' })
  const prevSlide = () => dispatch({ type: 'PREV_SLIDE' })
  const setSlide = (i: number) => dispatch({ type: 'SET_SLIDE', payload: i })

  useEffect(() => {
    timerRef.current = window.setInterval(nextSlide, 5000)
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
    }
  }, [currentSlide])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (touch) dispatch({ type: 'SET_TOUCH_START', payload: touch.clientX })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (touch) dispatch({ type: 'SET_TOUCH_END', payload: touch.clientX })
  }

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) nextSlide()
    else if (distance < -minSwipeDistance) prevSlide()
  }

  return { currentSlide, onTouchStart, onTouchMove, onTouchEnd, nextSlide, prevSlide, setSlide }
}

export default useSlide
