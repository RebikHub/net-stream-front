import WebTorrent from 'webtorrent/dist/webtorrent.min.js';
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import sw from 'webtorrent/dist/sw.min.js';

export const ServiceStream = () => {
  const videoRef = useRef()
  const torrentId =
    'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';

  // const downloadTorrent = () => {
  //   client.add(torrentId, (torrent) => {
  //     const file = torrent.files.find((file) => file.name.endsWith('.mp4'));
  //     console.log('file: ', { file });
  //     videojs(videoRef.current, {}, function onPlayerReady() {
  //       this.src({ type: 'video/mp4', src: file.createReadStream() });
  //     });
  //   });
  // };


  useEffect(() => {
    const client = new WebTorrent();
    client.add(torrentId, torrent => {
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files.find(file => file.name.endsWith('.mp4'))

      // Stream to a <video> element by providing an the DOM element
      file.streamTo(videoRef)
      console.log('Ready to play!')
    })
  }, []);

  return (
    <video
      id="video-container"
      className="video-js vjs-default-skin"
      data-setup="{}"
      controls
      ref={videoRef}
    />
  );
};



