import { FC, useEffect, useRef } from 'react';
import Hls from 'hls.js';

type Props = {
  url: string;
  className?: string;
};

export const VideoPlayer: FC<Props> = ({ url, className }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (Hls.isSupported() && ref.current != null) {
      if (hlsRef.current !== null) {
        hlsRef.current.destroy();
      }

      const hls = new Hls();
      hlsRef.current = hls;

      hls.attachMedia(ref.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('video and hls.js are now bound together !');
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('manifest-parsed: ');
      });

      hls.on(Hls.Events.MANIFEST_LOADED, (_, data) => {
        console.log('Имя канала:', data.levels[0]);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('fatal media error encountered, try to recover');
              hls.recoverMediaError();
              break;
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('fatal network error encountered', data);
              hls.recoverMediaError();
              break;
            default:
              console.log('error hls destroy');
              hls.destroy();
              break;
          }
        }
      });

      hls.loadSource(url);
    }
  }, [url]);

  useEffect(() => {
    return () => {
      if (hlsRef.current !== null) {
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
      }
    };
  }, []);

  return <video ref={ref} className={className} autoPlay controls></video>;
};