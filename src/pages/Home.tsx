import { useRef, useState, useCallback } from 'react';
import { useUpdateTvStreamQuery } from '../services/query-hooks/useUpdateTvStreamQuery';
import { Playlist } from '../components/Playlist';
import { Video } from '../components/Video';
import { FailedUrlType } from '../services/hls-hook/useHls';
import { usePlaylistQuery } from '../services/query-hooks/usePlaylistQuery';
import { AppRoutes } from '../routes/Routes';
// import { VideoPlayer } from '../components/VideoPlayer';


export type VideoOptionsType = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sourceUrl: string;
  sources: {
    src: string;
    type: string[];
  }[];
}

export const Home = () => {
  return (
    <main>
      <AppRoutes />
    </main>
  );
}