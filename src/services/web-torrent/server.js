import { getStreamAddMagnet, getStreamInfoHashName, getStreamStop } from '../api';

const u1 =
  'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
const u4 = 'https://webtorrent.io/torrents/cosmos-laundromat.torrent';
const u8 = 'https://webtorrent.io/torrents/big-buck-bunny.torrent';
const u7 =
  'magnet:?xt=urn:btih:c73143ae09458c9474a774da5fe981322a772b57&dn=rutor.info_%D0%A3%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D1%8F%D1%8F+%D0%B3%D0%B8%D0%BC%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D0%BA%D0%B0+%D0%BA%D0%B8%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D1%85+%D0%B4%D0%BE%D0%BB%D0%B3%D0%BE%D0%B6%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9+%282015%29+MP4&tr=udp://opentor.net:6969&tr=http://retracker.local/announce';
const u9 =
  'magnet:?xt=urn:btih:8c8c7b9389989dd09fa86219f57dc8237633704f&dn=rutor.info_%D0%9F%D0%BE%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5+%C2%AB%D0%92%D0%B8%C2%BB+%2F+Gen+V+%5BS01%5D+%282023%29+WEB-DLRip+%7C+LostFilm&tr=udp://opentor.net:6969&tr=http://retracker.local/announce';
const u10 =
  'magnet:?xt=urn:btih:8fe0407df7d4a6c077394c0caf227fa51325d150&dn=rutor.info_%D0%9E%D0%B4%D0%BD%D0%B0%D0%B6%D0%B4%D1%8B+%D0%B2+%D1%81%D1%82%D1%83%D0%B4%D0%B8%D0%B8+%2F+Once+Upon+a+Studio+%282023%29+WEB-DLRip-AVC+%7C+%D0%9A%D0%9F%D0%9A+%7C+Jaskier&tr=udp://opentor.net:6969&tr=http://retracker.local/announce';
const u11 =
  'magnet:?xt=urn:btih:0F4385DAFCDDEF3CD1AD6F2086DAADF8D55DDAD0&dn=MomSwapped%2023%2011%2003%20Aiden%20Ashley%20And%20Barbie%20Feels%20XXX%20480p%20MP4-&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce';
const wuikmp4 =
  'magnet:?xt=urn:btih:8FD93E1A5B18EBF27972E3E8650CD577C9075AC7&dn=John.Wick.Chapter.3%20-%20Parabellum.2019.1080p.BRRip.x264-MP4&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce';

export const useStreamServer = () => {
  const addMagnet = async (magnet) => {
    const response = await getStreamAddMagnet(magnet);
    return response;
  };

  const stopStream = async (magnet) => {
    return await getStreamStop(magnet);
  };

  return {
    addMagnet,
    stopStream,
  };
};
