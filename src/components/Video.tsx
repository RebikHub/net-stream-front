import { useRef, useEffect, FC } from 'react';
import { VideoOptionsType } from '../pages/Home';
import { FailedUrlType, useHls } from '../services/hls-hook/useHls';
import { useLocation } from 'react-router-dom';

type Props = {
  options: VideoOptionsType;
  handleFailedUrl?: (failedUrl: FailedUrlType) => void;
};

export const Video: FC<Props> = ({ options, handleFailedUrl }) => {
  // const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { urlFailed } = useHls({ ref: videoRef, url: options.sourceUrl });

  useEffect(() => {
    handleFailedUrl?.(urlFailed);
  }, [handleFailedUrl, options.sourceUrl, urlFailed]);

  return <video ref={videoRef} style={{ width: '900px', height: '600px' }} autoPlay controls></video>;
};
