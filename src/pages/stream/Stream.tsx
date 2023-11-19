import { useEffect, useState } from 'react';
import { useStreamServer } from '../../services/web-torrent/server';
import css from './Stream.module.scss';
import { useEventSource } from '../../services/sse-hook/useEventSource';
import { useScanSearchMovie } from '../../services/query-hooks/useScanSearchMovie';
import { usePostMovie } from '../../services/query-hooks/usePostMovie';
import classNames from 'classnames';

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

export const Stream = () => {
  const [input, setInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [data, setData] = useState<any>();
  const { addMagnet, stopStream } = useStreamServer();
  const { mutate, magnet, isPending, reset } = usePostMovie();
  const { searchMovieData, getSearchMovie, isLoading } = useScanSearchMovie(input);
  const eventSource = useEventSource({ setData, infoHash: magnet });

  const play = async () => {
    try {
      if (magnet) {
        const response = await addMagnet(magnet);
        const name = response.find(
          (item: any) => item.name.includes('.mp4') || item.name.includes('.mkv') || item.name.includes('.avi')
        );
        console.log(name);

        setActiveUrl(`http://localhost:8000/video/stream/${magnet}/${name.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancel = () => {
    setActiveUrl('');
    setInput('');
  };

  const stop = () => {
    eventSource?.close();
    magnet && stopStream(magnet);
    magnet && reset();
    cancel();
  };

  const search = () => {
    getSearchMovie();
  };

  const takeMovie = (movie: any) => {
    mutate(movie);
  };

  console.log(magnet);

  console.log(searchMovieData);

  useEffect(() => {
    return () => {
      eventSource?.close();
    };
  }, [eventSource]);

  return (
    <div className={css.container}>
      <h4 className={css.header}>Video Stream</h4>

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
          </div>
          {data && (
            <div>
              {/* <p>{error}</p> */}
              <p>Download speed: {(data.speed / 1048576).toFixed(2) || ''} mb/s</p>
              <p>Progress: {(data.progress * 100).toFixed(1) || ''} %</p>
              <p>Ratio: {data.ratio || ''}</p>
            </div>
          )}
          <div>
            {(isPending || isLoading) && <div>...Loading</div>}
            {searchMovieData && (
              <div>
                <h5>Result</h5>
                <ul>
                  {searchMovieData.map((item: MoviesDataRu) => (
                    <li key={item.urlTorrent} style={{ cursor: 'pointer' }} onClick={() => takeMovie(item.urlTorrent)}>
                      <p>{item.dateTorrent}</p>
                      <p>{item.nameTorrent}</p>
                      <p>{item.gbTorrent}</p>
                      {/* <p>{item.title}</p>
                      <p>{item.time}</p>
                      <p>{item.peers}</p>
                      <p>{item.seeds}</p>
                      <p>{item.provider}</p> */}
                      {/* <p>{item.infoHash}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={css.videoWrapper}>
          <video className={css.video} src={activeUrl} controls />
        </div>
      </div>
    </div>
  );
};
