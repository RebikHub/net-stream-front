import { useCallback, useState } from 'react';
import { Playlist } from '../../components/playlist/Playlist';
import { Video } from '../../components/video/Video';
import { VideoOptionsType } from '../home/Home';
import { FailedUrlType } from '../../services/hls-hook/useHls';
import { useUpdateTvStreamQuery } from '../../services/query-hooks/useUpdateTvStreamQuery';
import { ChannelListUrl } from '../../services/query-hooks/types';
import css from './Tv.module.scss';

export const Tv = () => {
  const [videOptions, setVideoOptions] = useState<VideoOptionsType>({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sourceUrl: '',
    sources: [
      {
        src: '',
        type: ['application/x-mpegURL', 'video/mp4'],
      },
    ],
  });
  const [urlFailed, setUrlFailed] = useState({
    url: videOptions.sourceUrl,
    failed: false,
  });
  // const playerRef = useRef(null);

  const handleChannel = async (channel: any) => {
    setVideoOptions((prev) => ({
      ...prev,
      sourceUrl: channel.url,
      sources: [
        {
          src: channel.url,
          type: ['application/x-mpegURL', 'video/mp4'],
        },
      ],
    }));
    // const response = await getChannelParser(channel.url);
    // console.log('parser: ', response);
  };

  const handleFailedUrl = useCallback((failedUrl: FailedUrlType) => {
    console.log('handleFailedUrl: ', failedUrl);

    setUrlFailed(failedUrl);
  }, []);

  const { refetch } = useUpdateTvStreamQuery();
  const [list, setList] = useState<ChannelListUrl>();

  // при переходе на другую страницу продолжает подгружать данные тв канала

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h4>Tv Streaming</h4>
        <div className={css.buttons}>
          <button onClick={() => setList(ChannelListUrl.ru)}>RU Channels</button>
          <button onClick={() => setList(ChannelListUrl.en)}>EN Channels</button>
          <button onClick={() => setList(ChannelListUrl.nsfw)}>XXX Channels</button>
          <button onClick={() => setList(ChannelListUrl.noname)}>Noname Channels</button>
          <button className={css.buttonUpdate} onClick={() => refetch()}>
            Update tv streams
          </button>
        </div>
      </header>
      <main className={css.main}>
        <Playlist className={css.playlist} handleChannel={handleChannel} urlFailed={urlFailed} list={list} />
        <Video className={css.video} options={videOptions} handleFailedUrl={handleFailedUrl} />
      </main>
    </div>
  );
};
