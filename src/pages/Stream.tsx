import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { getSSEData, postTorrentLink } from "../services/api";

export const Stream = () => {
  const [input, setInput] = useState('');

  const u1 = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
  const u2 = 'magnet:?xt=urn:btih:8b39622f0489c0c7ea31925ed908fcdc38e462c6&dn=rutor.info_%D0%9D%D0%B8%D0%BA%D1%82%D0%BE+%D1%82%D0%B5%D0%B1%D1%8F+%D0%BD%D0%B5+%D1%81%D0%BF%D0%B0%D1%81%D1%91%D1%82+%2F+No+One+Will+Save+You+%282023%29+WEB-DL+1080p+%7C+L2&tr=udp://opentor.net:6969&tr=http://retracker.local/announce'

  const { data, refetch } = useQuery({
    queryKey: [input],
    queryFn: () => postTorrentLink(input),
    enabled: false
  })

  const [sseData, setSSEData] = useState<any>();

  console.log(data);

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button type="button" onClick={() => {
          refetch()
          getSSEData(setSSEData)
        }}>Send link</button>
      </div>

      <div className="App">
        <h5>SSE в React с использованием Fetch</h5>
        <div id="sse-data">

          <p>{sseData}</p>

        </div>
      </div>
    </>
  )
}