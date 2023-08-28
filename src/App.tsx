import { useRef, useEffect, useState } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { Playlist } from './components/Playlist';

function App() {
  // const videoSource = 'https://sc.id-tv.kz/1hd.m3u8';
  // const urltv = 'http://ott-cdn.ucom.am/s64/index.m3u8'
  const [videOptions, setVideoOptions] = useState({
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

  // @ts-ignore
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      // @ts-ignore
      VideoPlayer.log('player is waiting');
    });

    player.on('dispose', () => {
      // @ts-ignore
      VideoPlayer.log('player will dispose');
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Header</h3>
      </header>
      <main>
        <h1>Video Streaming</h1>
        <Playlist handleChannel={handleChannel} />
        <VideoPlayer options={videOptions} onReady={handlePlayerReady} />
      </main>
    </div>
  );
}

export default App;
