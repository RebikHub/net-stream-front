import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useStreamServer } from '../../services/web-torrent/server';
import css from './Stream.module.scss';
import { useEventSource } from '../../services/sse-hook/useEventSource';
import { useScanSearchMovie } from '../../services/query-hooks/useScanSearchMovie';
import { usePostMovie } from '../../services/query-hooks/usePostMovie';

export interface MoviesData {
  title: string;
  time: string;
  seeds: number;
  peers: number;
  size: string;
  desc: string;
  provider: string;
  infoHash?: string;
}

export const Stream = () => {
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [data, setData] = useState<any>();
  const { addMagnet, stopStream } = useStreamServer();
  const { mutate, magnet, isPending, reset } = usePostMovie();
  const { searchMovieData, getSearchMovie, isLoading } = useScanSearchMovie(searchInput);
  const eventSource = useEventSource({ setData, infoHash: input || magnet });

  const play = useCallback(
    async (input: string) => {
      try {
        if (input) {
          const response = await addMagnet(input);
          const name = response.find((item: any) => item.name.includes('.mp4') || item.name.includes('.mkv'));
          setActiveUrl(`http://localhost:8000/video/stream/${input}/${name.name}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [addMagnet]
  );

  const cancel = () => {
    setActiveUrl('');
    setInput('');
  };

  const stop = () => {
    eventSource?.close();
    input && stopStream(input);
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

  useEffect(() => {
    if (magnet) {
      play(magnet);
    }
  }, [magnet, play]);

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
            <button onClick={() => play(input)}>Play</button>
            <button onClick={cancel}>Cancel</button>
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
            <label htmlFor="">
              Search movie in treckers
              <input
                type="text"
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              />
            </label>
            <button onClick={search}>Search</button>
            {(isPending || isLoading) && <div>...Loading</div>}
            {searchMovieData && (
              <div>
                <h5>Result</h5>
                <ul>
                  {searchMovieData.map((item: MoviesData) => (
                    <li key={item.title} style={{ cursor: 'pointer' }} onClick={() => takeMovie(item)}>
                      <p>{item.title}</p>
                      <p>{item.time}</p>
                      <p>{item.peers}</p>
                      <p>{item.seeds}</p>
                      <p>{item.provider}</p>
                      {/* <p>{item.infoHash}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: '700px', height: '400px' }}>
          <video className={css.video} src={activeUrl} controls />
        </div>
      </div>
    </div>
  );
};
