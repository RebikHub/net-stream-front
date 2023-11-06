import { useMemo, useRef, useState } from 'react';
import { useWebTorrent } from '../services/web-torrent/client';

export const Torrent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [infoHash, setInfoHash] = useState('');
  const { error, state, streamStart, streamClose } = useWebTorrent(videoRef);

  const videoUrl = useMemo(() => '', []);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '900px', height: '600px' }} />
      <input type="text" onChange={(e) => setInfoHash(e.currentTarget.value)} value={infoHash} />
      <button onClick={() => streamStart(infoHash)}>Play</button>
      <button
        onClick={() => {
          streamClose(infoHash);
          setInfoHash('');
        }}
      >
        Close Stream
      </button>
      <div>
        <p>{error}</p>
        <p>Download speed: {state.downloadSpeed}</p>
        <p>Progress: {state.progress}</p>
        <p>Ratio: {state.ratio}</p>
      </div>
    </div>
  );
};
