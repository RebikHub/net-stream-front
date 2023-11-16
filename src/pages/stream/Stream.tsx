import { useEffect, useRef, useState } from 'react';
import { useStreamServer } from '../../services/web-torrent/server';
import { getSSEData, getStreamStop } from '../../services/api';
import css from './Stream.module.scss';

export const Stream = () => {
  const infoHash = '8FD93E1A5B18EBF27972E3E8650CD577C9075AC7'; // Замените на свою магнет-ссылку
  const name = 'John.Wick.Chapter.3.-.Parabellum.2019.1080p.BluRay.x264-[YTS.LT].mp4';
  const [input, setInput] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [data, setData] = useState();
  const { addMagnet } = useStreamServer();

  const play = async () => {
    try {
      if (input) {
        const response = await addMagnet(input);
        console.log(response);
        const name = response.find((item: any) => item.name.includes('.mp4') || item.name.includes('.mkv'));
        setActiveUrl(`http://localhost:8000/video/stream/${input}/${name.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancel = () => {
    setActiveUrl('');
    setInput('');
  };

  const stop = async () => {
    await getStreamStop(input);
  };

  useEffect(() => {
    if (input) {
      getSSEData(setData, input);
    }
  }, [input]);

  useEffect(() => {
    console.log(data);
  });

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
            <button onClick={play}>Play</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={stop}>Stop</button>
          </div>
          {/* <div>
            <p>{error}</p>
            <p>Download speed: {state.downloadSpeed}</p>
            <p>Progress: {state.progress}</p>
            <p>Ratio: {state.ratio}</p>
          </div> */}
        </div>
        <video className={css.video} src={activeUrl} controls />
      </div>
    </div>
  );
};
