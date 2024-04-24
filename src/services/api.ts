import { ChannelListUrl } from './query-hooks/types'

const baseUrl = import.meta.env.VITE_API_URL

async function baseApi (url: string, config?: any) {
  try {
    const response = await fetch(baseUrl + url, config)
    if (!response.ok) {
      throw new Error('Failed to fetch playlist')
    }

    return await response?.json()
  } catch (error) {
    console.error('Error fetching playlist:', error)
  }
}

export const getPlaylist = async (list: ChannelListUrl) => {
  return await baseApi(`/tv/playlist/${list}`)
}

export const getUpdateTvStreams = async () => {
  return await baseApi('/tv/update')
}

export const getChannelParser = async (channel: string) => {
  return await baseApi(`/tv/channel/${channel}`)
}

// video stream

export const getVideoStream = async (magnetLink: string) => {
  return await baseApi(`/video/stream/${magnetLink}`)
}

export const getPlayVideoStream = async (name: string, link: string) => {
  return await baseApi(`/video/${name}/${link}`)
}

export const getStreamStats = async () => {
  return await baseApi('/video/stream/stats')
}

export const getStreamAddMagnet = async (magnet: string) => {
  return await baseApi(`/video/stream/add/${magnet}`)
}

export const getStreamStop = async (magnet: string) => {
  return await baseApi(`/video/stream/stop/${magnet}`)
}

export const postTorrentLink = async (magnetLink: string) => {
  return await baseApi('/video/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      magnetLink
    }
    )
  })
}

export const startVLCPlayer = async (magnet: string, name: string) => {
  return await baseApi(`/video/stream/start/${magnet}/${name}`)
}

export const getSSEData = async (setData: any, infoHash: string) => {
  // Парсим поток событий (SSE)
  const eventSource = new EventSource(baseUrl + `/video/stream/stats/${infoHash}`)

  // Назначаем обработчик для сообщений от сервера SSE
  eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    setData(data)
  })

  // Закрыть соединение SSE при размонтировании компонента
  return () => {
    eventSource.close()
  }
}

// Search movies

export const getSearchMovie = async (movie: string, filter: number) => {
  return await baseApi(`/search/ru/${filter}/${movie}`)
}

export const postMovie = async (movie: any) => {
  return await baseApi('/search/ru/magnet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: movie })
  })
}
