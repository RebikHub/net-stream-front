import { Route, Routes } from "react-router-dom"
import { Tv } from "../pages/Tv"
// import WebTorrentComponent from "../pages/WebTorrent/WebTorrentComponent"
// import TorrentComponent from "../pages/torrent/Torrent"
// import { Video } from "../components/Video"
import { Main } from "../pages/Main"
import { Stream } from "../pages/Stream"
import VueStream from "../pages/VueStream"
// import TorrentPlayer from "../pages/WebTorrent/TorrentPlayer"
import { ServiceStream } from "../pages/ServiceStream"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path='/tv' element={<Tv />} />
      <Route path="/video" element={<Stream />} />
      <Route path="/stream" element={<VueStream />} />
      <Route path="/torrent" element={<ServiceStream />} />
    </Routes>
  )
}