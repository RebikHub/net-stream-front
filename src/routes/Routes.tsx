import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Torrent } from '../pages/torrent/Torrent';
import { Tv } from '../pages/tv/Tv';
import { Stream } from '../pages/stream/Stream';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/tv" element={<Tv />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/torrent" element={<Torrent />} />
      </Route>
    </Routes>
  );
};
