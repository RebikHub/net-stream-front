// import React, { useState } from 'react';
// import { WebTorrentClient } from './tor';

// const WebTorrentComponent = () => {
//   const client = WebTorrentClient;
//   const [torrentId, setTorrentId] = useState(
//     'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
//   );
//   const [logItems, setLogItems] = useState<any>([]);

//   const handleTorrentSubmit = (e: any) => {
//     e.preventDefault();
//     log('Adding ' + torrentId);
//     client.add(torrentId, onTorrent);
//   };

//   const onTorrent = (torrent: any) => {
//     log('Got torrent metadata!');
//     log(
//       'Torrent info hash: ' +
//       torrent.infoHash +
//       ' ' +
//       '<a href="' +
//       torrent.magnetURI +
//       '" target="_blank">[Magnet URI]</a> ' +
//       '<a href="' +
//       torrent.torrentFileBlobURL +
//       '" target="_blank" download="' +
//       torrent.name +
//       '.torrent">[Download .torrent]</a>'
//     );

//     // Print out progress every 5 seconds
//     const interval = setInterval(() => {
//       log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%');
//     }, 5000);

//     torrent.on('done', () => {
//       log('Progress: 100%');
//       clearInterval(interval);
//     });

//     // Render all files into the page
//     torrent.files.forEach((file: { appendTo: (arg0: string) => void; getBlobURL: (arg0: (err: any, url: any) => void) => void; name: string; }) => {
//       file.appendTo('.log');
//       log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)');
//       file.getBlobURL((err, url) => {
//         if (err) return log(err.message);
//         log('File done.');
//         log('<a href="' + url + '">Download full file: ' + file.name + '</a>');
//       });
//     });
//   };

//   const log = (str: any) => {
//     setLogItems([...logItems, str]);
//   };

//   return (
//     <div>
//       <h1>Download files using the WebTorrent protocol (BitTorrent over WebRTC).</h1>

//       <form onSubmit={handleTorrentSubmit}>
//         <label htmlFor="torrentId">Download from a magnet link: </label>
//         <input
//           name="torrentId"
//           placeholder="magnet:"
//           value={torrentId}
//           onChange={(e) => setTorrentId(e.target.value)}
//         />
//         <button type="submit">Download</button>
//       </form>

//       <h2>Log</h2>
//       <div className="log">
//         {logItems.map((item: any, index: any) => (
//           <p key={index} dangerouslySetInnerHTML={{ __html: item }}></p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WebTorrentComponent;
export { }