import { FC, useCallback, useEffect, useState } from 'react'
import css from './Stream.module.scss'
import { useEventSource } from '../../services/sse-hook/useEventSource'
import { useScanSearchMovie } from '../../services/query-hooks/useScanSearchMovie'
import { usePostMovie } from '../../services/query-hooks/usePostMovie'
// import classNames from "classnames";
import { filters } from '../../constants/filters'
// import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { getStreamStop, postStreamAddMagnet, startVLCPlayer } from '../../services/api'
import { catchError } from '../../services/utils/catchError'
// import imdb from '../../services/imdb'

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

// const url: string = import.meta.env.VITE_API_URL

export const Stream: FC = () => {
  const [input, setInput] = useState('')
  // const [activeUrl, setActiveUrl] = useState('')
  const [filterId, setFilterId] = useState(1)
  const [movieName, setMovieName] = useState('')
  const [listMovies, setListMovies] = useState<{
    list: Array<{
      name: string
      length: number
    }>
    hash: string
  }>({ list: [], hash: '' })
  const { mutate, magnet, reset } = usePostMovie()
  const { searchMovieData, getSearchMovie } = useScanSearchMovie(
    input,
    filterId
  )
  const {
    eventSourceData,
    clearEventSource,
  } = useEventSource(magnet?.hash)

  const play = (): void => {
    try {
      if (listMovies.hash !== '' && Boolean(movieName)) {
        // setActiveUrl('')
        startVLCPlayer(listMovies.hash, movieName).catch(catchError)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const stop = useCallback(() => {
    clearEventSource()
    if (magnet != null) {
      getStreamStop(magnet.hash).catch(catchError)
      reset()
    }

    // setActiveUrl('')
    setMovieName('')
    setListMovies({ list: [], hash: '' })
  }, [clearEventSource, magnet, reset])

  const cancel = (): void => {
    stop()
    setInput('')
    setMovieName('')
    setListMovies({ list: [], hash: '' })
  }

  const search = (): void => {
    getSearchMovie().catch(catchError)
  }

  const takeMovie = (movie: string): void => {
    if (magnet != null) {
      clearEventSource()
      getStreamStop(magnet.hash).catch(catchError)
      // setActiveUrl('')
      setMovieName('')
      setListMovies({ list: [], hash: '' })
    }

    mutate(movie, {
      onSuccess: (data) => {
        console.log(data)

        if (data?.link) {
          postStreamAddMagnet(data.link)
            .then(({ files, infoHash }) => {
              console.log(files)
              setListMovies({ list: files, hash: infoHash })
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
    // setActiveUrl(`${url}/video/stream/${listMovies.hash}/${nameMovie}`)
  }

  // const getImdbFilms = async () => {
  //   const response = await imdb.getSearchMovie(input)
  //   console.log(response);

  //   if (response) {
  //     console.log(response);
  //   }
  // }

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
            placeholder='Search movie'
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={css.buttons}>
            {/* <button onClick={getImdbFilms}>IMDB</button> */}
            <button onClick={search}>Search</button>
            <button
              onClick={play}
              className={classNames({ [css.disabled]: !(Boolean(listMovies.hash) && Boolean(movieName)) })}
              disabled={!(Boolean(listMovies.hash) && Boolean(movieName))}
            >
              Play
            </button>
            <button onClick={stop}>Stop</button>
            <button onClick={cancel}>Cancel</button>
          </div>
          {eventSourceData != null && (
            <div>
              <p>
                Download speed: {(eventSourceData.speed / 1048576).toFixed(2)} mb/s
              </p>
              <p>Progress: {(eventSourceData.progress * 100).toFixed(1)} %</p>
            </div>
          )}
          {listMovies.list.length === 1
            ? (<p style={{ cursor: 'pointer' }} onClick={() => choseMovie(listMovies.list[0].name)}>{listMovies.list[0].name}</p>)
            : listMovies.list.length > 0
              ? (
                <div>
                  {listMovies.list.map((item: any) => <p key={item.name} style={{ cursor: 'pointer' }} onClick={() => choseMovie(item.name)}>{item.name}</p>)}
                </div>)
              : null}
        </div>
        {/* {activeUrl !== ''
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
          : (isPending || isLoading) && <div>...Loading</div>} */}
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
