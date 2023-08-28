import { useRef, useState } from 'react';
import { useUpdateTvStreamQuery } from '../services/hooks/useUpdateTvStreamQuery';
import { Playlist } from '../components/Playlist';
import { VideoPlayer } from '../components/VideoPlayer';


export type VideoOptionsType = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string[];
  }[];
}

export const Home = () => {
  // const videoSource = 'https://sc.id-tv.kz/1hd.m3u8';
  // const urltv = 'http://ott-cdn.ucom.am/s64/index.m3u8'
  const [videOptions, setVideoOptions] = useState<VideoOptionsType>({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '',
      // type: 'video/mp4'
      // type: 'application/x-mpegURL'
      type: ['application/x-mpegURL', 'video/mp4']
    }]
  })
  const playerRef = useRef(null);

  const handleChannel = (channel: any) => {
    setVideoOptions((prev) => ({
      ...prev,
      sources: [
        {
          src: channel.url,
          type: ['application/x-mpegURL', 'video/mp4']
        }
      ]
    }))
  }


  const { refetch } = useUpdateTvStreamQuery()

  function handleUpdateTvStreams() {
    refetch()
  }

  return (
    <main>
      <h1>Video Streaming</h1>
      <Playlist handleChannel={handleChannel} />
      {/* <Video options={videOptions} /> */}
      <VideoPlayer options={videOptions} />
      <button onClick={handleUpdateTvStreams}>Update tv streams</button>
    </main>
  );
}