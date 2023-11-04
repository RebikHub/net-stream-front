import WebTorrent from 'webtorrent';

export const useWebTorrent = () => {
  const infoHash = 'd4a8dbcea3b3eee8ff4ec76b79602a22aecfd85c';
  const client = new WebTorrent();
  client.add(infoHash, (torrent) => {
    console.log(torrent);
  });
};
