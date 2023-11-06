import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import css from './Header.module.css';
import { useHls } from '../services/hls-hook/useHls';

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
};

export const Home = () => {
  return (
    <main>
      <Header />
      <div className={css.main}>
        <Outlet />
      </div>
    </main>
  );
};
