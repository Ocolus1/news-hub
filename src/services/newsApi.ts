import type { Article } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY; // Free API key for demo
const BASE_URL = 'https://gnews.io/api/v4';

export async function fetchNews(category: string = 'all', query: string = '') {
  try {
    // Determine the endpoint based on category and query
    const endpoint = query ? 'search' : 'top-headlines';
    
    const params = new URLSearchParams({
      apikey: API_KEY,
      lang: 'en',
      country: 'us',
      max: '10', // Number of articles to fetch
      ...(query ? { q: query } : {}),
      ...(category !== 'all' ? { topic: category } : {})
    });

    const response = await fetch(`${BASE_URL}/${endpoint}?${params}`);
    if (!response.ok) {
      throw new Error(`News API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the response to match our Article type
    return {
      articles: data.articles.map((article: Article, index: number) => ({
        id: String(index + 1),
        title: article.title || 'Untitled',
        description: article.description || 'No description available',
        source: article.source?.name || 'Unknown Source',
        category: category === 'all' ? 'general' : category,
        url: article.url || '#',
        imageUrl: article.image,
        publishedAt: article.publishedAt || new Date().toISOString()
      }))
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}