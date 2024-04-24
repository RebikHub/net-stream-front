import { useCallback, useEffect, useMemo, useState } from 'react'
import WebTorrent from 'webtorrent'
// import WebTorrent from 'webtorrent/dist/webtorrent.min';

export const useWebTorrent = (element: any) => {
  const client = useMemo(() => new WebTorrent(), [])
  const [state, setState] = useState({
    progress: 0,
    downloadSpeed: 0,
    ratio: 0
  })

  const [error, setError] = useState()

  const createStream = useCallback(async () => {
    const controller = await navigator.serviceWorker.ready
    await client.createServer({ controller })
  }, [client])

  const streamStart = useCallback(
    (infoHash: string) => {
      client.add(infoHash, (torrent: any) => {
        const file = torrent.files.find((file: any) => file.name.endsWith('.mp4'))

        file.streamTo(element.current)
      })
    },
    [client, element]
  )

  const streamClose = useCallback(
    (hash: any) => {
      client.remove(hash)
    },
    [client]
  )

  useEffect(() => {
    createStream()

    client.on('error', (err: any) => {
      setError(err.message)
    })

    client.on('torrent', (t: any) => {
      console.log(t)
      setState({
        progress: client.progress,
        downloadSpeed: client.downloadSpeed,
        ratio: client.ratio
      })
    })

    return () => {
      if (client) {
        // client._server?.close();
        client.destroy()
      }
    }
  }, [client, createStream, element])

  return useMemo(
    () => ({
      error,
      state,
      createStream,
      streamClose,
      streamStart
    }),
    [createStream, error, state, streamClose, streamStart]
  )
}
