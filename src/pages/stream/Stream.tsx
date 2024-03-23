import { useCallback, useEffect, useState } from 'react';
import { useStreamServer } from '../../services/web-torrent/server';
import css from './Stream.module.scss';
import { useEventSource } from '../../services/sse-hook/useEventSource';
import { useScanSearchMovie } from '../../services/query-hooks/useScanSearchMovie';
import { usePostMovie } from '../../services/query-hooks/usePostMovie';
import classNames from 'classnames';
import { filters } from '../../constants/filters';
import ReactPlayer from 'react-player';

export interface MoviesDataEn {
  title: string;
  time: string;
  seeds: number;
  peers: number;
  size: string;
  desc: string;
  provider: string;
  infoHash?: string;
}

export interface MoviesDataRu {
  dateTorrent: string;
  gbTorrent: string;
  nameTorrent: string;
  urlTorrent: string;
}

const url = process.env.REACT_APP_API_URL;

export const Stream = () => {
  const [input, setInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [data, setData] = useState<any>();
  const [filterId, setFilterId] = useState(1);
  const { addMagnet, stopStream } = useStreamServer();
  const { mutate, magnet, isPending, reset } = usePostMovie();
  const { searchMovieData, getSearchMovie, isLoading } = useScanSearchMovie(input, filterId);
  const eventSource = useEventSource({ setData, infoHash: magnet });

  const play = async () => {
    try {
      if (magnet) {
        const response = await addMagnet(magnet);
        console.log(response);

        const name = response?.files?.find(
          (item: any) => item.name.includes('.mp4') || item.name.includes('.mkv') || item.name.includes('.avi')
        );
        console.log(name);

        setActiveUrl(`${url}/video/stream/${magnet}/${name.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stop = useCallback(() => {
    eventSource?.close();
    magnet && stopStream(magnet);
    magnet && reset();
    setActiveUrl('');
    setData(null);
  }, [eventSource, magnet, reset, stopStream]);

  const cancel = () => {
    stop();
    setInput('');
  };

  const search = () => {
    getSearchMovie();
  };

  const takeMovie = (movie: any) => {
    if (magnet) {
      eventSource?.close();
      stopStream(magnet);
      setActiveUrl('');
      setData(null);
    }

    mutate(movie);
  };

  useEffect(() => {
    return () => {
      eventSource?.close();
    };
  }, [eventSource]);

  useEffect(() => {
    stop();
  }, []);

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
            type="text"
            value={input}
            placeholder="Past magnet"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={css.buttons}>
            <button onClick={search}>Search</button>
            <button onClick={play} className={classNames({ [css.disabled]: !magnet })} disabled={!magnet}>
              Play
            </button>
            <button onClick={stop}>Stop</button>
            <button onClick={cancel}>Cancel</button>
          </div>
          {data && (
            <div>
              {/* <p>{error}</p> */}
              <p>Download speed: {(data.speed / 1048576).toFixed(2) || ''} mb/s</p>
              <p>Progress: {(data.progress * 100).toFixed(1) || ''} %</p>
              <p>Ratio: {data.ratio || ''}</p>
            </div>
          )}
        </div>
        {data && (
          <div className={css.videoWrapper}>
            <ReactPlayer className={css.video} url={activeUrl} controls playing />
          </div>
        )}
      </div>
      <div className={css.result}>
        {(isPending || isLoading) && <div>...Loading</div>}
        {searchMovieData && (
          <>
            <h5>Result</h5>
            <ul>
              {searchMovieData.map((item: any) => (
                <li key={item.urlTorrent} onClick={() => takeMovie(item.urlTorrent || item?.magnet)}>
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
  );
};
