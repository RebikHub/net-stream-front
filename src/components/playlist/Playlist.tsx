import { FC } from 'react';
import cn from 'classnames';
import { FailedUrlType } from '../../services/hls-hook/useHls';
import { ChannelListUrl } from '../../services/query-hooks/types';
import { usePlaylistQuery } from '../../services/query-hooks/usePlaylistQuery';
import css from './Playlist.module.scss';

type Props = {
  handleChannel: (channel: any) => void;
  urlFailed: FailedUrlType;
  list?: ChannelListUrl;
  className?: string;
};

export const Playlist: FC<Props> = ({ handleChannel, urlFailed, list, className }) => {
  const { data } = usePlaylistQuery(list);

  return (
    <ul className={cn(css.list, className)}>
      {data?.map((channel: any) => {
        return (
          <li key={channel.url + channel.id} className={css.item} onClick={() => handleChannel(channel)}>
            {channel.logo && (
              <div>
                <img src={channel.logo} alt={channel.name} />
              </div>
            )}
            <p>
              {channel.name} {channel.url === urlFailed.url ? `${urlFailed.failed}` : 'none'}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
