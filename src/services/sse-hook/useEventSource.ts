import { useEffect, useRef } from 'react'

export interface ResponseEventSource {
  speed: number
  progress: number
  ratio: number
  torrentName: string
  torrentProgress: string
  torrentDownLoadSpeed: string
  torrentRatio: string
  torrentUploadSpeed: string
}

export const useEventSource = ({ setData, infoHash }: { setData: any, infoHash?: string }): EventSource | undefined => {
  const baseUrl: string = import.meta.env.VITE_API_URL
  const source = useRef<EventSource>()

  useEffect(() => {
    if (infoHash != null) {
      source.current = new EventSource(baseUrl + `/video/stream/stats/${infoHash}`)

      source.current.onmessage = (event) => {
        const data: ResponseEventSource = JSON.parse(event.data)
        setData(data)
      }

      source.current.onerror = (error) => {
        console.error('SSE Error:', error)
      }
    }

    return () => {
      source.current?.close()
    }
  }, [baseUrl, infoHash, setData])

  return source.current
}
