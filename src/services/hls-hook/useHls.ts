import Hls from "hls.js";
import { RefObject, useMemo, useState } from "react";

export type FailedUrlType = {
  url: string,
  failed: boolean
}

export const useHls = ({ ref, url }: { ref: RefObject<HTMLVideoElement>, url: string }) => {
  const hls = useMemo(() => new Hls(), []);
  const [urlFailed, setUrlFailed] = useState<FailedUrlType>({
    url,
    failed: false
  })

  if (Hls.isSupported() && ref.current) {
    hls.attachMedia(ref.current);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('video and hls.js are now bound together !');
    });

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(
        'manifest loaded, found ' + data.levels.length + ' quality level',
      );
    });

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


  return urlFailed
}