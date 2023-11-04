import { useRef, useEffect, FC } from 'react';
import { VideoOptionsType } from '../pages/Home';
import { FailedUrlType, useHls } from '../services/hls-hook/useHls';

type Props = {
  options: VideoOptionsType;
  handleFailedUrl: (failedUrl: FailedUrlType) => void;
};

export const Video: FC<Props> = ({ options, handleFailedUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const urlFailed = useHls({ ref: videoRef, url: options.sourceUrl });

  useEffect(() => {
    handleFailedUrl(urlFailed);
  }, [handleFailedUrl, urlFailed]);

  return <video ref={videoRef} style={{ width: '900px', height: '600px' }} autoPlay controls></video>;
};
