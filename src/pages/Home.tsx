import { useRef, useState, useCallback } from 'react';
import { useUpdateTvStreamQuery } from '../services/query-hooks/useUpdateTvStreamQuery';
import { Playlist } from '../components/Playlist';
import { Video } from '../components/Video';
import { FailedUrlType } from '../services/hls-hook/useHls';
import { usePlaylistQuery } from '../services/query-hooks/usePlaylistQuery';
// import { VideoPlayer } from '../components/VideoPlayer';


export type VideoOptionsType = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sourceUrl: string;
  sources: {
    src: string;
    type: string[];
  }[];
}

export const Home = () => {
  // const videoSource = 'https://sc.id-tv.kz/1hd.m3u8';
  // const urltv = 'http://ott-cdn.ucom.am/s64/index.m3u8'
  // const { data } = usePlaylistQuery()

  const [videOptions, setVideoOptions] = useState<VideoOptionsType>({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sourceUrl: '',
    sources: [{
      src: '',
      // type: 'video/mp4'
      // type: 'application/x-mpegURL'
      type: ['application/x-mpegURL', 'video/mp4']
    }]
  })
  const [urlFailed, setUrlFailed] = useState({
    url: videOptions.sourceUrl,
    failed: false
  })
  // const playerRef = useRef(null);

  const handleChannel = (channel: any) => {
    setVideoOptions((prev) => ({
      ...prev,
      sourceUrl: channel.url,
      sources: [
        {
          src: channel.url,
          type: ['application/x-mpegURL', 'video/mp4']
        }
      ]
    }))
  }

  const handleFailedUrl = useCallback((failedUrl: FailedUrlType) => {
    console.log('handleFailedUrl: ', failedUrl);

    setUrlFailed(failedUrl)
  }, [])

  const { refetch } = useUpdateTvStreamQuery()

  function handleUpdateTvStreams() {
    refetch()
  }

  return (
    <main>
      <header style={{ display: 'flex' }}>      <h1>Video Streaming</h1>
        <button style={{ height: '50px', marginLeft: '50px', margin: 'auto' }} onClick={handleUpdateTvStreams}>Update tv streams</button></header>
      <Playlist handleChannel={handleChannel} urlFailed={urlFailed} />
      <Video options={videOptions} handleFailedUrl={handleFailedUrl} />
      {/* <VideoPlayer options={videOptions} /> */}
    </main>
  );
}