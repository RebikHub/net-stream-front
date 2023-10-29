import { FailedUrlType } from '../services/hls-hook/useHls';
import { usePlaylistQuery } from '../services/query-hooks/usePlaylistQuery';

export const Playlist = ({ handleChannel, urlFailed }: { handleChannel: (channel: any) => void, urlFailed: FailedUrlType }) => {
  const { data } = usePlaylistQuery()

  return (
    <ul style={{ height: '300px', overflow: 'auto' }}>
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