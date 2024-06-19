import { FC, useState } from 'react'
import cn from 'classnames'
import { ChannelListUrl } from '../../services/query-hooks/types'
import { usePlaylistQuery } from '../../services/query-hooks/usePlaylistQuery'
import css from './Playlist.module.scss'

interface Props {
  handleChannel: (channel: any) => void
  list?: ChannelListUrl
  className?: string
}

export const Playlist: FC<Props> = ({ handleChannel, list, className }) => {
  const { data } = usePlaylistQuery(list)
  const [currentChannel, setCurrentChannel] = useState()

  const onClickChannel = (channel: any) => {
    handleChannel(channel)
    setCurrentChannel(channel.url)
  }

  return (
    <ul className={cn(css.list, className)}>
      {data?.map((channel: any) => {
        return (
          <li
            key={channel.url + channel.id}
            className={cn(css.item, {
              [css.active]: channel.url === currentChannel
            })}
            onClick={() => onClickChannel(channel)}
          >
            {channel.logo && (
              <div>
                <img src={channel.logo} alt={channel.name} />
              </div>
            )}
            <p>{channel.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
