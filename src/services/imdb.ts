const baseUrl: string = import.meta.env.VITE_IMDB_URL
const token: string = import.meta.env.VITE_IMDB_TOKEN

const baseApi = async (url: string, config?: any): Promise<any> => {
  try {
    const response = await fetch(baseUrl + url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...config
    })
    if (!response.ok) {
      throw new Error('Failed to fetch playlist')
    }

    return await response?.json()
  } catch (error) {
    console.error('Error fetching playlist:', error)
  }
}

const getSearchMovie = async (name: string) => {
  return await baseApi(`search/movie?query=${name}&language=ru-RU`)
}

export default {
  getSearchMovie
}