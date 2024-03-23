import { useRef, useEffect, FC } from 'react';
import cn from 'classnames';
import { FailedUrlType, useHls } from '../../services/hls-hook/useHls';
import css from './Video.module.scss';
import ReactPlayer from 'react-player';

type Props = {
  url: string;
  handleFailedUrl?: (failedUrl: FailedUrlType) => void;
  className?: string;
};

export const Video: FC<Props> = ({ url, handleFailedUrl, className }) => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const { urlFailed } = useHls({ ref: videoRef, url });

  // useEffect(() => {
  //   handleFailedUrl?.(urlFailed);
  // }, [handleFailedUrl, urlFailed]);

  return <ReactPlayer url={url} className={cn(css.video, className)} controls playing />;
};
