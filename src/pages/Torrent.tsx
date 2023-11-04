import { useMemo } from 'react';
import { useWebTorrent } from '../services/web-torrent/client';

export const Torrent = () => {
  useWebTorrent();

  const videoUrl = useMemo(() => '', []);

  return (
    <div>
      <video src={videoUrl} controls></video>
    </div>
  );
};
