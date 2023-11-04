import { useCallback, useState } from 'react';
import { Playlist } from '../components/Playlist';
import { Video } from '../components/Video';
import { VideoOptionsType } from './Home';
import { FailedUrlType } from '../services/hls-hook/useHls';
import { useUpdateTvStreamQuery } from '../services/query-hooks/useUpdateTvStreamQuery';
import { usePlaylistQuery } from '../services/query-hooks/usePlaylistQuery';
import { ChannelListUrl } from '../services/query-hooks/types';

export const Tv = () => {
  // const videoSource = 'https://sc.id-tv.kz/1hd.m3u8';
  // const urltv = 'http://ott-cdn.ucom.am/s64/index.m3u8'
  // const { data } = usePlaylistQuery()

  const [videOptions, setVideoOptions] = useState<VideoOptionsType>({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sourceUrl: '',
    sources: [
      {
        src: '',
        // type: 'video/mp4'
        // type: 'application/x-mpegURL'
        type: ['application/x-mpegURL', 'video/mp4'],
      },
    ],
  });
  const [urlFailed, setUrlFailed] = useState({
    url: videOptions.sourceUrl,
    failed: false,
  });
  // const playerRef = useRef(null);

  const handleChannel = (channel: any) => {
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
  };

  const handleFailedUrl = useCallback((failedUrl: FailedUrlType) => {
    console.log('handleFailedUrl: ', failedUrl);

    setUrlFailed(failedUrl);
  }, []);

  const { refetch } = useUpdateTvStreamQuery();
  const [list, setList] = useState<ChannelListUrl>();

  function handleUpdateTvStreams() {
    refetch();
  }

  return (
    <div>
      <header style={{ display: 'flex' }}>
        <h4>Video Streaming</h4>
        <div>
          <button onClick={() => setList(ChannelListUrl.ru)}>RU Channels</button>
          <button onClick={() => setList(ChannelListUrl.en)}>EN Channels</button>
          {/* <button onClick={() => setList(ChannelListUrl.nsfw)}>XXX Channels</button> */}
          <button onClick={() => setList(ChannelListUrl.noname)}>Noname Channels</button>
        </div>
        <button style={{ height: '50px', marginLeft: '50px', margin: 'auto' }} onClick={handleUpdateTvStreams}>
          Update tv streams
        </button>
      </header>
      <main>
        <Playlist handleChannel={handleChannel} urlFailed={urlFailed} list={list} />
        <Video options={videOptions} handleFailedUrl={handleFailedUrl} />
      </main>
    </div>
  );
};
