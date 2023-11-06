import { Route, Routes } from 'react-router-dom';
import VideoStream from '../pages/VideoStream';
import { Home } from '../pages/Home';
import { Torrent } from '../pages/Torrent';
import { Tv } from '../pages/Tv';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/tv" element={<Tv />} />
        <Route path="/stream" element={<VideoStream />} />
        <Route path="/torrent" element={<Torrent />} />
      </Route>
    </Routes>
  );
};
