import { useMemo, useRef } from 'react';
import { useWebTorrent } from '../services/web-torrent/client';

export const Torrent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { error, state } = useWebTorrent(videoRef);

  const videoUrl = useMemo(() => '', []);

  return (
    <div>
      <video ref={videoRef} src={videoUrl} controls></video>
      <div>
        <p>{error}</p>
        <p>Download speed: {state.downloadSpeed}</p>
        <p>Progress: {state.progress}</p>
        <p>Ratio: {state.ratio}</p>
      </div>
    </div>
  );
};
