import { useCallback, useEffect, useRef, useState } from 'react'

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

const baseUrl: string = import.meta.env.VITE_API_URL

export const useEventSource = (hash?: string | null): { eventSourceData: ResponseEventSource | null, clearEventSource: () => void, startEventSource: (infoHash: string) => void } => {
  const source = useRef<EventSource | null>(null)
  const [eventSourceData, setEventSourceData] = useState<ResponseEventSource | null>(null)

  const clearEventSource = useCallback(() => {
    if (source.current) {
      source.current.close()
      source.current = null
    }

    if (eventSourceData) {
      setEventSourceData(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startEventSource = useCallback((infoHash: string) => {
    if (source.current) {
      source.current.close()
    }

    source.current = new EventSource(baseUrl + `/video/stream/stats/${infoHash}`)

    source.current.onmessage = (event) => {
      try {
        const data: ResponseEventSource = JSON.parse(event.data)
        setEventSourceData(data)
      } catch (error) {
        console.error('Error parsing event data:', error)
      }
    }

    source.current.onerror = (error) => {
      console.error('SSE Error:', error)
    }
  }, [])

  useEffect(() => {
    if (hash) {
      startEventSource(hash)
    }
    console.log('render effect');

    return () => {
      console.log('render return');

      clearEventSource()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return {
    startEventSource,
    eventSourceData,
    clearEventSource
  }
}
