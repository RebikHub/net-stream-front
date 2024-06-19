import { useState } from 'react'
import { Playlist } from '../../components/playlist/Playlist'
import { useUpdateTvStreamQuery } from '../../services/query-hooks/useUpdateTvStreamQuery'
import { ChannelListUrl } from '../../services/query-hooks/types'
import css from './Tv.module.scss'
import { VideoPlayer } from '../../components/player/VideoPlayer'

export const Tv = () => {
  const [tvUrl, setTvUrl] = useState('')

  const handleChannel = (channel: any) => {
    console.log(channel)

    setTvUrl(channel.url)
  }

  const { refetch } = useUpdateTvStreamQuery()
  const [list, setList] = useState<ChannelListUrl>()

  // при переходе на другую страницу продолжает подгружать данные тв канала

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h4>Tv Streaming</h4>
        <div className={css.buttons}>
          <button onClick={() => setList(ChannelListUrl.ru)}>
            RU Channels
          </button>
          {/* <button onClick={() => setList(ChannelListUrl.en)}>EN Channels</button> */}
          <button onClick={() => setList(ChannelListUrl.noname)}>
            Noname Channels
          </button>
          <button className={css.buttonUpdate} onClick={async () => await refetch()}>
            Update tv streams
          </button>
        </div>
      </header>
      <main className={css.main}>
        <Playlist
          className={css.playlist}
          handleChannel={handleChannel}
          list={list}
        />
        <VideoPlayer className={css.player} url={tvUrl} />
        {/* <ReactPlayer url={tvUrl} controls playing /> */}
      </main>
    </div>
  )
}
