import { useCallback, useEffect, useMemo, useState } from 'react';
import WebTorrent from 'webtorrent/dist/webtorrent.min';
import * as sw from 'webtorrent/dist/sw.min';

const u1 =
  'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
const u2 =
  'magnet:?xt=urn:btih:8b39622f0489c0c7ea31925ed908fcdc38e462c6&dn=rutor.info_%D0%9D%D0%B8%D0%BA%D1%82%D0%BE+%D1%82%D0%B5%D0%B1%D1%8F+%D0%BD%D0%B5+%D1%81%D0%BF%D0%B0%D1%81%D1%91%D1%82+%2F+No+One+Will+Save+You+%282023%29+WEB-DL+1080p+%7C+L2&tr=udp://opentor.net:6969&tr=http://retracker.local/announce';
const u3 =
  'magnet:?xt=urn:btih:b6e84977bebbeeb1d6233c9bb897c58e10f99130&dn=rutor.info_%D0%9E%D1%81%D0%BE%D0%B1%D0%BD%D1%8F%D0%BA+%D1%81+%D0%BF%D1%80%D0%B8%D0%B2%D0%B8%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8+%2F+Haunted+Mansion+%282023%29+BDRip+720p+%D0%BE%D1%82+%D1%81%D0%B5%D0%BB%D0%B5%D0%B7%D0%B5%D0%BD%D1%8C+%7C+D&tr=udp://opentor.net:6969&tr=http://retracker.local/announce';

const u4 = 'https://webtorrent.io/torrents/cosmos-laundromat.torrent';

export const useWebTorrent = (element) => {
  const infoHash = 'd4a8dbcea3b3eee8ff4ec76b79602a22aecfd85c';
  const client = useMemo(() => new WebTorrent(), []);
  const [state, setState] = useState({
    progress: 0,
    downloadSpeed: 0,
    ratio: 0,
  });

  const [error, setError] = useState();

  client.on('error', (err) => {
    setError(err.message);
  });

  client.on('torrent', () => {
    setState({
      progress: Math.round(client.progress * 100 * 100) / 100,
      downloadSpeed: client.downloadSpeed,
      ratio: client.ratio,
    });
  });

  const createStream = async () => {
    const controller = await navigator.serviceWorker.ready;
    console.log(controller);
    client.createServer({ controller });

    client.add(u4, (torrent) => {
      console.log(torrent);
      const file = torrent.files.find((file) => {
        return file.name.endsWith('.mp4');
      });

      console.log(element);
      file.streamTo(element.current);
    });
  };

  useEffect(() => {
    createStream();

    return () => {
      // client._server.close();
      client.destroy();
    };
  }, []);

  return {
    error,
    state,
  };
};
