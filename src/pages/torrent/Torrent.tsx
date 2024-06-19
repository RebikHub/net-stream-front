import { useEffect, useState } from 'react'
import { useStreamServer } from '../../services/web-torrent/server'
import css from './Torrent.module.scss'
import { useEventSource } from '../../services/sse-hook/useEventSource'
import ReactPlayer from 'react-player'

const url: string = import.meta.env.VITE_API_URL

export const Torrent = () => {
  const [input, setInput] = useState('')
  const [activeUrl, setActiveUrl] = useState('')
  const [data, setData] = useState<any>()
  const { addMagnet, stopStream } = useStreamServer()
  const eventSource = useEventSource({ setData, infoHash: input })

  const play = async () => {
    try {
      if (input) {
        const response = await addMagnet(input)
        const name = response?.files?.find(
          (item: any) =>
            item.name.includes('.mp4') ||
            item.name.includes('.mkv') ||
            item.name.includes('.avi')
        )
        if (name != null) {
          setActiveUrl(`${url}/video/stream/${input}/${name.name}`)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const cancel = () => {
    setActiveUrl('')
    setInput('')
  }

  const stop = () => {
    eventSource?.close()
    input && stopStream(input)
    cancel()
  }

  useEffect(() => {
    return () => {
      eventSource?.close()
    }
  }, [eventSource])

  return (
    <div className={css.container}>
      <h4 className={css.header}>Torrent Stream</h4>

      <div className={css.main}>
        <div className={css.controls}>
          <input
            className={css.input}
            type='text'
            value={input}
            placeholder='Past magnet'
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={css.buttons}>
            <button onClick={play}>Play</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={stop}>Stop</button>
          </div>
          {data && (
            <div>
              {/* <p>{error}</p> */}
              <p>
                Download speed: {(data.speed / 1048576).toFixed(2) || ''} mb/s
              </p>
              <p>Progress: {(data.progress * 100).toFixed(1) || ''} %</p>
              <p>Ratio: {data.ratio || ''}</p>
            </div>
          )}
        </div>
        <div style={{ width: '700px', height: '400px' }}>
          <ReactPlayer className={css.video} url={activeUrl} controls playing />
        </div>
      </div>
    </div>
  )
}
