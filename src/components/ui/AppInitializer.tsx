import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { loadArticles, refreshRSSFeeds } from '../../features/news/newsSlice.js'

const AppInitializer = () => {
  const dispatch = useAppDispatch()
  const category = useAppSelector(state => state.news.category)
  const searchTerm = useAppSelector(state => state.news.searchTerm)
  const lastFetchTime = useAppSelector(state => state.news.lastFetchTime)
  const hasInitialized = useRef<boolean>(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    dispatch(loadArticles({ category, searchTerm }))

    const isExpired =
      !lastFetchTime ||
      new Date().getTime() - new Date(lastFetchTime).getTime() > 3600000

    if (isExpired) dispatch(refreshRSSFeeds())
  }, [])

  return null
}

export default AppInitializer