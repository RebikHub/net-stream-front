import { useEffect, useState } from 'react';
import { fetchPlaylist } from '../services/api';

export const Playlist = ({ handleChannel }: { handleChannel: (channel: any) => void }) => {
  const [playlist, setPlaylist] = useState<any>([])

  useEffect(() => {
    const getPlaylist = async () => {
      const data = await fetchPlaylist()
      setPlaylist(data)
    }
    getPlaylist()
  }, [])
  return (
    <ul>
      {playlist?.map((channel: any) => {
        return (
          <li key={channel.id} style={{ cursor: 'pointer' }} onClick={() => handleChannel(channel)}>
            <p>{channel.title}</p></li>
        )
      })}
    </ul>
  )
}