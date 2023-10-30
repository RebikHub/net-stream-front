import { FailedUrlType } from '../services/hls-hook/useHls';
import { ChannelListUrl } from '../services/query-hooks/types';
import { usePlaylistQuery } from '../services/query-hooks/usePlaylistQuery';

export const Playlist = ({ handleChannel, urlFailed, list }: { handleChannel: (channel: any) => void, urlFailed: FailedUrlType, list?: ChannelListUrl }) => {
  const { data } = usePlaylistQuery(list)

  return (
    <ul style={{ width: '900px', height: '300px', overflow: 'auto' }}>
      {data?.map((channel: any) => {
        return (
          <li key={channel.url + channel.id} style={{ cursor: 'pointer' }} onClick={() => handleChannel(channel)}>
            {channel.logo && <div style={{ width: '30px', height: '30px' }}>
              <image style={{ width: '30px', height: '30px' }} href={channel.logo} />
            </div>}
            <p>{channel.name}  {channel.url === urlFailed.url ? `${urlFailed.failed}` : 'none'}</p>
          </li>
        )
      })}
    </ul>
  )
}