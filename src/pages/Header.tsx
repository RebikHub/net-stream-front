import { Link } from 'react-router-dom';
import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={css.header}>
      <Link style={{ padding: '2rem' }} to={'/'}>
        Home
      </Link>
      <Link style={{ padding: '2rem' }} to="/tv">
        TV
      </Link>
      <Link style={{ padding: '2rem' }} to="/video">
        Video
      </Link>
      <Link style={{ padding: '2rem' }} to="/stream">
        Stream
      </Link>
      <Link style={{ padding: '2rem' }} to="/torrent">
        Torrent
      </Link>
    </header>
  );
};
