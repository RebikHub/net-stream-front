import Hls from 'hls.js'
import { useEffect, useMemo, useRef } from 'react'

interface HookHls {
  url: string
}

export const useHls = ({ url }: HookHls) => {
  const ref = useRef<HTMLVideoElement>(null)
  const hls = useMemo(() => new Hls(), [])

  useEffect(() => {
    if (Hls.isSupported() && (ref.current != null)) {
      hls.attachMedia(ref.current)

      // hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
      //   console.log('video and hls.js are now bound together !', data);
      // });

      // hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      //   console.log('manifest-parsed: ', data);
      // });

      // hls.on(Hls.Events.MANIFEST_LOADED, function (event, data) {
      //   console.log('Имя канала:', data.levels[0]);
      // });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('fatal media error encountered, try to recover')
              hls.recoverMediaError()
              break
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('fatal network error encountered', data)
              hls.recoverMediaError()
              break
            default:
              console.log('error hls destroy')

              hls.destroy()
              break
          }
        }
      })
    }
  }, [hls, ref.current])

  useEffect(() => {
    hls.loadSource(url)
  }, [hls, url])

  useEffect(() => {
    return () => {
      hls.detachMedia()
      hls.destroy()
    }
  }, [hls])

  return { ref }
}
