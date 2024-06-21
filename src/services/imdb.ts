const baseUrl: string = import.meta.env.VITE_IMDB_URL
const token: string = import.meta.env.VITE_IMDB_TOKEN

// const url = 'https://api.themoviedb.org/3/search/movie?query=dune&include_adult=false&language=en-US&page=1'

const baseApi = async (url: string, config?: any): Promise<any> => {
  try {
    const response = await fetch(baseUrl + url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
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
  return await baseApi(`/search/movie?query=${name}&include_adult=false&language=ru-RU&page=1`)
}

export default {
  getSearchMovie
}
