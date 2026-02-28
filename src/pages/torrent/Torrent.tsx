import { useCallback, useEffect, useState } from 'react'
import css from './Torrent.module.scss'
import { useEventSource } from '../../services/sse-hook/useEventSource'
import {
  getStreamStop,
  postStreamAddMagnet,
  startVLCPlayer,
} from '../../services/api'
import { catchError } from '../../services/utils/catchError'

export const Torrent = () => {
  const [input, setInput] = useState<string | null>(null)
  const [listMovies, setListMovies] = useState<{
    list: Array<{
      name: string
      length: number
    }>
    hash: string
  }>({ list: [], hash: '' })
  const { eventSourceData, clearEventSource, startEventSource } =
    useEventSource()

  const play = (): void => {
    try {
      if (input) {
        postStreamAddMagnet(input)
          .then(({ files, infoHash }) => {
            console.log(files)
            startEventSource(infoHash)
            setListMovies({ list: files, hash: infoHash })
          })
          .catch((error: any) => {
            console.error('Error adding magnet:', error)
          })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const choseMovie = (nameMovie: string): void => {
    startVLCPlayer(listMovies.hash, nameMovie)
      .then((res) => {
        console.log('vlc start: ', res)
      })
      .catch(catchError)
  }

  const cancel = (): void => {
    stop()
    setInput('')
    setListMovies({ list: [], hash: '' })
  }

  const stop = useCallback(() => {
    clearEventSource()
    if (input) {
      getStreamStop(input).catch(catchError)
    }
  }, [clearEventSource, input])

  useEffect(() => {
    return () => {
      clearEventSource()
    }
  }, [clearEventSource])

  useEffect(() => {
    stop()

    return () => {
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={css.container}>
      <h4 className={css.header}>Torrent Stream</h4>

      <div className={css.main}>
        <div className={css.controls}>
          <input
            className={css.input}
            type="text"
            value={input || ''}
            placeholder="Past magnet"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={css.buttons}>
            <button onClick={play}>Play</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={stop}>Stop</button>
          </div>
          {eventSourceData && (
            <div>
              {/* <p>{error}</p> */}
              <p>
                Download speed:{' '}
                {(eventSourceData.speed / 1048576).toFixed(2) || ''} mb/s
              </p>
              <p>
                Progress: {(eventSourceData.progress * 100).toFixed(1) || ''} %
              </p>
              <p>Ratio: {eventSourceData.ratio || ''}</p>
            </div>
          )}
          {listMovies.list.length === 1 ? (
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => choseMovie(listMovies.list[0].name)}
            >
              {listMovies.list[0].name}
            </p>
          ) : listMovies.list.length > 0 ? (
            <div>
              {listMovies.list.map((item: any) => (
                <p
                  key={item.name}
                  style={{ cursor: 'pointer' }}
                  onClick={() => choseMovie(item.name)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
