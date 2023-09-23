import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { postTorrentLink } from "../services/api";

export const Stream = () => {
  const [input, setInput] = useState('');

  const { data, refetch } = useQuery({
    queryKey: [input],
    queryFn: () => postTorrentLink('magnet:?xt=urn:btih:8b39622f0489c0c7ea31925ed908fcdc38e462c6&dn=rutor.info_%D0%9D%D0%B8%D0%BA%D1%82%D0%BE+%D1%82%D0%B5%D0%B1%D1%8F+%D0%BD%D0%B5+%D1%81%D0%BF%D0%B0%D1%81%D1%91%D1%82+%2F+No+One+Will+Save+You+%282023%29+WEB-DL+1080p+%7C+L2&tr=udp://opentor.net:6969&tr=http://retracker.local/announce'),
    enabled: false
  })

  console.log(data);


  return (
    <div>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={() => refetch()}>Send link</button>
    </div>
  )
}