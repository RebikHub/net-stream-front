import React, { useEffect, useState } from 'react';
import WebTorrent from 'webtorrent/dist/webtorrent.min.js';

const TorrentPlayer = () => {
  const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

  const [torrent, setTorrent] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const client = new WebTorrent();

    client.on('error', (err) => {
      console.error('ERROR:', err.message);
    });

    client.add(torrentId, (torrent) => {
      setTorrent(torrent);
      console.log(torrent);
      setIsDownloading(true);

      // Handle torrent download here
    });

    return () => {
      // Cleanup if needed (e.g., when the component unmounts)
      if (torrent) {
        torrent.destroy();
      }
    };
  }, [torrent, torrentId]);

  return (
    <div>
      {isDownloading ? (
        <div>
          <p>Downloading...</p>
          {/* Render torrent information or video player here */}
        </div>
      ) : (
        <p>Waiting for download to start...</p>
      )}
    </div>
  );
};

export default TorrentPlayer;
