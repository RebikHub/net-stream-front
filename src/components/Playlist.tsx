import { usePlaylistQuery } from '../services/hooks/usePlaylistQuery';

export const Playlist = ({ handleChannel }: { handleChannel: (channel: any) => void }) => {
  const { data } = usePlaylistQuery()

  return (
    <ul style={{ height: '300px', overflow: 'auto' }}>
      {data?.map((channel: any) => {
        return (
          <li key={channel.url + channel.id} style={{ cursor: 'pointer' }} onClick={() => handleChannel(channel)}>
            <p>{channel.name}</p></li>
        )
      })}
    </ul>
  )
}