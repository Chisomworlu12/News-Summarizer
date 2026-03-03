import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('app-theme')
  if (saved) return saved as 'light' | 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light'
      localStorage.setItem('app-theme', state.value)
      applyTheme(state.value)
    },
    setTheme: (state, action) => {
      state.value = action.payload
      localStorage.setItem('app-theme', state.value)
      applyTheme(state.value)
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer