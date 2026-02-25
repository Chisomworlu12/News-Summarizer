jest.mock('../../utils/rssParser', () => ({
  getArticles: jest.fn(),
  getTopHeadlines: jest.fn(),
  fetchAndStoreRSS: jest.fn(),
}));

import newsReducer, { setCategory } from './newsSlice';

describe('news reducer', () => {
  const initialState = {
    articles: [],
    topHeadlines: [],
    category: 'general',
    loading: false,
    error: null,
    isRefreshing: false,
    lastFetchTime: null,
    searchTerm: '',
  };

  it('should handle setCategory', () => {
    const actual = newsReducer(initialState, setCategory('technology'));
    expect(actual.category).toEqual('technology');
  });
});