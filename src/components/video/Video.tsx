import { useRef, useEffect, FC } from 'react';
import cn from 'classnames';
import { VideoOptionsType } from '../../pages/home/Home';
import { FailedUrlType, useHls } from '../../services/hls-hook/useHls';
import css from './Video.module.scss';

type Props = {
  options: VideoOptionsType;
  handleFailedUrl?: (failedUrl: FailedUrlType) => void;
  className?: string;
};

export const Video: FC<Props> = ({ options, handleFailedUrl, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { urlFailed } = useHls({ ref: videoRef, url: options.sourceUrl });

  useEffect(() => {
    handleFailedUrl?.(urlFailed);
  }, [handleFailedUrl, options.sourceUrl, urlFailed]);

  return <video ref={videoRef} className={cn(css.video, className)} autoPlay controls></video>;
};
