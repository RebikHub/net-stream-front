import React, { useEffect, useState } from 'react';
import WebTorrent from 'webtorrent';
import moment from 'moment';

const App = () => {
  const [torrentId] = useState('https://webtorrent.io/torrents/sintel.torrent');
  const [client] = useState(new WebTorrent());
  const [torrent, setTorrent] = useState(null);
  const [isSeed, setIsSeed] = useState(false);

  useEffect(() => {
    client.add(torrentId, (torrent) => {
      setTorrent(torrent);

      const file = torrent.files.find((file) => file.name.endsWith('.mp4'));
      file.appendTo('#output');

      torrent.on('done', onDone);
      setInterval(onProgress, 500);
      onProgress();

      function onProgress() {
        document.querySelector('#numPeers').innerHTML =
          torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');

        const percent = Math.round(torrent.progress * 100 * 100) / 100;
        document.querySelector('#progressBar').style.width = percent + '%';
        document.querySelector('#downloaded').innerHTML = prettyBytes(torrent.downloaded);
        document.querySelector('#total').innerHTML = prettyBytes(torrent.length);

        let remaining;
        if (torrent.done) {
          remaining = 'Done.';
        } else {
          remaining = moment
            .duration(torrent.timeRemaining / 1000, 'seconds')
            .humanize();
          remaining =
            remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.';
        }
        document.querySelector('#remaining').innerHTML = remaining;

        document.querySelector('#downloadSpeed').innerHTML =
          prettyBytes(torrent.downloadSpeed) + '/s';
        document.querySelector('#uploadSpeed').innerHTML =
          prettyBytes(torrent.uploadSpeed) + '/s';
      }

      function onDone() {
        setIsSeed(true);
        onProgress();
      }
    });
  }, [client, torrentId]);

  function prettyBytes(num) {
    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const neg = num < 0;
    if (neg) num = -num;
    if (num < 1) return (neg ? '-' : '') + num + ' B';
    const exponent = Math.min(
      Math.floor(Math.log(num) / Math.log(1000)),
      units.length - 1
    );
    const unit = units[exponent];
    num = Number((num / Math.pow(1000, exponent)).toFixed(2));
    return (neg ? '-' : '') + num + ' ' + unit;
  }

  return (
    <div id="hero">
      <div id="output">
        <div id="progressBar"></div>
        {/* The video player will be added here */}
      </div>
      <div id="status">
        <div>
          <span className={`show-leech ${isSeed ? 'hidden' : ''}`}>
            Downloading{' '}
          </span>
          <span className={`show-seed ${!isSeed ? 'hidden' : ''}`}>Seeding </span>
          <code>
            <a id="torrentLink" href={torrentId}>
              sintel.torrent
            </a>
          </code>
          <span className={`show-leech ${isSeed ? 'hidden' : ''}`}> from </span>
          <span className={`show-seed ${!isSeed ? 'hidden' : ''}`}> to </span>
          <code id="numPeers">0 peers</code>.
        </div>
        <div>
          <code id="downloaded"></code>
          of <code id="total"></code> — <span id="remaining"></span>
          <br />
          &#x2198;<code id="downloadSpeed">0 b/s</code> /
          &#x2197;<code id="uploadSpeed">0 b/s</code>
        </div>
      </div>
    </div>
  );
};

export default App;
