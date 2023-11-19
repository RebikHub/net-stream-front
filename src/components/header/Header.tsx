import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import css from './Header.module.scss';

export const Header = () => {
  const location = useLocation();
  return (
    <header className={css.header}>
      <Link className={cn(css.link, { [css.active]: location.pathname === '/' })} to={'/'}>
        Home
      </Link>
      <Link className={cn(css.link, { [css.active]: location.pathname === '/tv' })} to="/tv">
        TV
      </Link>
      <Link className={cn(css.link, { [css.active]: location.pathname === '/stream' })} to="/stream">
        Stream
      </Link>
      <Link className={cn(css.link, { [css.active]: location.pathname === '/torrent' })} to="/torrent">
        Torrent
      </Link>
    </header>
  );
};
