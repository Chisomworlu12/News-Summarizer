import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticles, getTopHeadlines, fetchAndStoreRSS } from '../../utils/rssParser'
import { RSS_SOURCES } from '../../lib/rssSources.js'
import type { Article } from '../../utils/rssParser.js'

export const loadArticles = createAsyncThunk(
  'news/loadArticles',
  async ({ category, searchTerm }: { category: string; searchTerm: string }) => {
    const [articles, topHeadlines] = await Promise.all([
      getArticles(category, 50, searchTerm || ''),
      getTopHeadlines(10)
    ])
    return { articles, topHeadlines }
  }
)

export const refreshRSSFeeds = createAsyncThunk(
  'news/refreshRSSFeeds',
  async (_, { dispatch, getState }) => {
    const workPromise = fetchAndStoreRSS(RSS_SOURCES)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 800))
    await Promise.all([workPromise, delayPromise])

    const now = new Date()
    localStorage.setItem('lastRSSFetch', now.toISOString())

    const state = getState() as any
    dispatch(loadArticles({ 
      category: state.news.category, 
      searchTerm: state.news.searchTerm 
    }))

    return now.toISOString()
  }
)

interface NewsState {
  articles: Article[]
  topHeadlines: Article[]
  category: string
  searchTerm: string
  loading: boolean
  isRefreshing: boolean
  error: string | null
  lastFetchTime: string | null
}

const initialState: NewsState = {
  articles: [],
  topHeadlines: [],
  category: 'general',
  searchTerm: '',
  loading: true,
  isRefreshing: false,
  error: null,
  lastFetchTime: localStorage.getItem('lastRSSFetch') ?? null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory: (state, action) => { 
        state.category = action.payload;
        state.loading = true; 
    },
    setSearchTerm: (state, action) => { 
        state.searchTerm = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.topHeadlines = action.payload.topHeadlines
        state.loading = false
      })
      .addCase(loadArticles.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to load articles'
      })
    builder
      .addCase(refreshRSSFeeds.pending, (state) => { state.isRefreshing = true })
      .addCase(refreshRSSFeeds.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.lastFetchTime = action.payload
      })
      .addCase(refreshRSSFeeds.rejected, (state) => { state.isRefreshing = false })
  }
})

export const { setCategory, setSearchTerm } = newsSlice.actions
export default newsSlice.reducer