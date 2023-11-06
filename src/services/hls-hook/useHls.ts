import Hls from "hls.js";
import { RefObject, useEffect, useMemo, useState } from "react";

export type FailedUrlType = {
  url: string,
  failed: boolean
}

type HookHls = {
  ref: RefObject<HTMLVideoElement>;
  url: string;
}

export const useHls = ({ ref, url }: HookHls) => {
  const hls = useMemo(() => new Hls(), []);
  const [urlFailed, setUrlFailed] = useState<FailedUrlType>({
    url,
    failed: false
  })

  if (Hls.isSupported() && ref.current) {
    hls.attachMedia(ref.current);

    // hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
    //   console.log('video and hls.js are now bound together !', data);
    // });

    // hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    //   console.log('manifest-parsed: ', data);
    // });

    // hls.on(Hls.Events.MANIFEST_LOADED, function (event, data) {
    //   console.log('Имя канала:', data.levels[0]);
    // });

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.log('error-type: ', data.type);
      console.log('error-details: ', data.details);

      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover');
            hls.recoverMediaError();
            break;
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error('fatal network error encountered', data);
            break;
          default:
            setUrlFailed({
              url,
              failed: true
            })
            hls.destroy();
            break;
        }
      }
    });

  }

  useMemo(() => {
    hls.loadSource(url);
  }, [hls, url])

  useEffect(() => {

    return () => {
      hls.stopLoad()
    }
  }, [hls])


  return { urlFailed }
}