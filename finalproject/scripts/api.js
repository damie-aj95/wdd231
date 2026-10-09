const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Fetches top anime array directly from Jikan API v4.
 * Uses AbortSignal.timeout(4000) for fast fallback on slow/blocked networks.
 * @returns {Promise<Array|null>}
 */
export async function fetchTopAnime() {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?limit=20`, {
      signal: AbortSignal.timeout(4000) // 4-second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn('Jikan API delayed or unreachable. Loading local fallback dataset:', error);
    
    try {
      // Stage 2: Fallback to local JSON snapshot (data/anime.json)
      const fallbackResponse = await fetch('data/anime.json');
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback Error! Status: ${fallbackResponse.status}`);
      }
      return await fallbackResponse.json();
    } catch (fallbackError) {
      console.error('Local fallback fetch failed:', fallbackError);
      return null;
    }
  }
}