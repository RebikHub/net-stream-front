import { ChannelListUrl } from './query-hooks/types'

const baseUrl: string = import.meta.env.VITE_API_URL

const baseApi = async (url: string, config?: any): Promise<any> => {
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

export const getPlaylist = async (list: ChannelListUrl): Promise<any> => {
  return await baseApi(`/tv/playlist/${list}`)
}

export const getUpdateTvStreams = async (): Promise<any> => {
  return await baseApi('/tv/update')
}

export const getChannelParser = async (channel: string): Promise<any> => {
  return await baseApi(`/tv/channel/${channel}`)
}

// video stream

export const getVideoStream = async (magnetLink: string): Promise<any> => {
  return await baseApi(`/video/stream/${magnetLink}`)
}

export const getPlayVideoStream = async (name: string, link: string): Promise<any> => {
  return await baseApi(`/video/${name}/${link}`)
}

export const getStreamStats = async (): Promise<any> => {
  return await baseApi('/video/stream/stats')
}

export interface ResponseStreamAddMagnet {
  files: Array<{
    name: string
    length: number
  }>
}

export const getStreamAddMagnet = async (magnet: string): Promise<ResponseStreamAddMagnet> => {
  return await baseApi(`/video/stream/add/${magnet}`)
}

export const getStreamStop = async (magnet: string): Promise<any> => {
  return await baseApi(`/video/stream/stop/${magnet}`)
}

export const postTorrentLink = async (magnetLink: string): Promise<any> => {
  return await baseApi('/video/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      magnetLink
    }
    )
  })
}

export const startVLCPlayer = async (link: string, name: string): Promise<any> => {
  return await baseApi(`/video/stream/start/${link}/${name}`)
}

export const getSSEData = async (setData: any, infoHash: string): Promise<any> => {
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

export type ResponseSearchMovie = Array<{
  urlTorrent: string | undefined
  nameTorrent: string
  dateTorrent: string
  gbTorrent: string
  ratio: {
    seed: string
    leech: string
  }
  seeds: string
}>

export const getSearchMovie = async (movie: string, filter: number): Promise<ResponseSearchMovie> => {
  return await baseApi(`/search/ru/${filter}/${movie}`)
}

export const postMovie = async (movie: any): Promise<{ link: string }> => {
  return await baseApi('/search/ru/magnet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: movie })
  })
}
