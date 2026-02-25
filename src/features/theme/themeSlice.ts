import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('app-theme')
  if (saved) return saved as 'light' | 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light'
      localStorage.setItem('app-theme', state.value)
      document.documentElement.classList.toggle('dark', state.value === 'dark')
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer