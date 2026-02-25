import { configureStore } from "@reduxjs/toolkit";
import newsReducer from '../features/news/newsSlice.js'
import themeReducer from '../features/theme/themeSlice.js'

 export const store = configureStore({
    reducer:{
        news: newsReducer,
        theme: themeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
