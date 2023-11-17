import { useRef, useEffect, FC } from 'react';
import cn from 'classnames';
import { FailedUrlType, useHls } from '../../services/hls-hook/useHls';
import css from './Video.module.scss';

type Props = {
  url: string;
  handleFailedUrl?: (failedUrl: FailedUrlType) => void;
  className?: string;
};

export const Video: FC<Props> = ({ url, handleFailedUrl, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { urlFailed } = useHls({ ref: videoRef, url });

  useEffect(() => {
    handleFailedUrl?.(urlFailed);
  }, [handleFailedUrl, urlFailed]);

  return <video ref={videoRef} className={cn(css.video, className)} autoPlay controls></video>;
};
