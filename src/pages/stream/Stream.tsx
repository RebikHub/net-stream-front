import { FC, useCallback, useEffect, useState } from 'react'
import { useStreamServer } from '../../services/web-torrent/server'
import css from './Stream.module.scss'
import { ResponseEventSource, useEventSource } from '../../services/sse-hook/useEventSource'
import { useScanSearchMovie } from '../../services/query-hooks/useScanSearchMovie'
import { usePostMovie } from '../../services/query-hooks/usePostMovie'
// import classNames from "classnames";
import { filters } from '../../constants/filters'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { startVLCPlayer } from '../../services/api'
import { catchError } from '../../services/utils/catchError'
import imdb from '../../services/imdb'

export interface MoviesDataEn {
  title: string
  time: string
  seeds: number
  peers: number
  size: string
  desc: string
  provider: string
  infoHash?: string
}

export interface MoviesDataRu {
  dateTorrent: string
  gbTorrent: string
  nameTorrent: string
  urlTorrent: string
}

const url: string = import.meta.env.VITE_API_URL

export const Stream: FC = () => {
  const [input, setInput] = useState('')
  const [activeUrl, setActiveUrl] = useState('')
  const [data, setData] = useState<ResponseEventSource | null>(null)
  const [filterId, setFilterId] = useState(1)
  const [movieName, setMovieName] = useState('')
  const [listMovies, setListMovies] = useState<{
    list: Array<{
      name: string
      length: number
    }>
    link: string
  }>({ list: [], link: '' })
  const { addMagnet, stopStream } = useStreamServer()
  const { mutate, magnet, isPending, reset } = usePostMovie()
  const { searchMovieData, getSearchMovie, isLoading } = useScanSearchMovie(
    input,
    filterId
  )
  const eventSource = useEventSource({ setData, infoHash: magnet })

  const play = (): void => {
    try {
      if (listMovies.link !== '' && Boolean(movieName)) {
        setActiveUrl('')
        startVLCPlayer(listMovies.link, movieName).catch(catchError)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const stop = useCallback(() => {
    eventSource?.close()
    if (magnet != null) {
      stopStream(magnet).catch(catchError)
      reset()
    }

    setActiveUrl('')
    setMovieName('')
    setData(null)
    setListMovies({ list: [], link: '' })
  }, [eventSource, magnet, reset, stopStream])

  const cancel = (): void => {
    stop()
    setInput('')
    setMovieName('')
    setListMovies({ list: [], link: '' })
  }

  const search = (): void => {
    getSearchMovie().catch(catchError)
  }

  const takeMovie = (movie: string): void => {
    if (magnet != null) {
      eventSource?.close()
      stopStream(magnet).catch(catchError)
      setActiveUrl('')
      setMovieName('')
      setData(null)
      setListMovies({ list: [], link: '' })
    }

    mutate(movie, {
      onSuccess: (data: { link: string }) => {
        console.log(data)

        if (data.link !== '') {
          addMagnet(data.link)
            .then(({ files }) => {
              console.log(files)
              setListMovies({ list: files, link: data.link })
              if (files.length === 1) {
                setMovieName(files[0].name)
              }
            })
            .catch((error: any) => {
              console.error('Error adding magnet:', error)
            })
        }
      }
    })
  }

  const choseMovie = (nameMovie: string): void => {
    setMovieName(nameMovie)
    setActiveUrl(`${url}/video/stream/${listMovies.link}/${nameMovie}`)
  }

  const getImdbFilms = async () => {
    const response = await imdb.getSearchMovie(input)
    console.log(response);
    
    if (response) {
      console.log(response);
    }
  }

  useEffect(() => {
    return () => {
      eventSource?.close()
    }
  }, [eventSource])

  useEffect(() => {
    stop()

    return () => {
      stop()
    }
  }, [])

  return (
    <div className={css.container}>
      <h4 className={css.header}>Video Stream</h4>

      <ul className={css.filters}>
        {filters.map((item) => (
          <li
            key={item.id}
            className={`${css.item} ${filterId === item.id ? css.item_active : ''}`}
            onClick={() => setFilterId(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>

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
            <button onClick={getImdbFilms}>IMDB</button>
            <button onClick={search}>Search</button>
            <button
              onClick={play}
              className={classNames({ [css.disabled]: !(Boolean(listMovies.link) && Boolean(movieName)) })}
              disabled={!(Boolean(listMovies.link) && Boolean(movieName))}
            >
              Play
            </button>
            <button onClick={stop}>Stop</button>
            <button onClick={cancel}>Cancel</button>
          </div>
          {data != null && (
            <div>
              <p>
                Download speed: {(data.speed / 1048576).toFixed(2)} mb/s
              </p>
              <p>Progress: {(data.progress * 100).toFixed(1)} %</p>
            </div>
          )}
          {listMovies.list.length === 1
            ? (<p style={{ cursor: 'pointer' }} onClick={() => choseMovie(listMovies.list[0].name)}>{listMovies.list[0].name}</p>)
            : listMovies.list.length > 0
              ? (
                <select onClick={(v) => choseMovie(v.currentTarget.value)}>
                  {listMovies.list.map((item: any) => <option key={item.name} value={item.name}>{item.name}</option>)}
                </select>)
              : null}
        </div>
        {activeUrl !== ''
          ? (
            <div className={css.videoWrapper}>
              <ReactPlayer
                className={css.video}
                url={activeUrl}
                controls
                playing
                muted={false}
                type='video/mp4'
              />
            </div>)
          : (isPending || isLoading) && <div>...Loading</div>}
      </div>
      <div className={css.result}>
        {(searchMovieData != null) && (
          <>
            <h5>Result</h5>
            <ul>
              {searchMovieData.map((item: any) => (
                <li
                  key={item.urlTorrent}
                  onClick={() => takeMovie(item?.urlTorrent != null ? item.urlTorrent : item?.magnet)}
                >
                  <p>{item.dateTorrent}</p>
                  <p>{item.nameTorrent}</p>
                  <p>{item.gbTorrent}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
