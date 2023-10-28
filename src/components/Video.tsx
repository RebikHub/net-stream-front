import { useRef, useEffect } from 'react';
import { VideoOptionsType } from "../pages/Home"
import { FailedUrlType, useHls } from '../services/hls-hook/useHls';


export const Video = ({ options, handleFailedUrl }: { options: VideoOptionsType, handleFailedUrl: (failedUrl: FailedUrlType) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const urlFailed = useHls({ ref: videoRef, url: options.sourceUrl })

  useEffect(() => {
    handleFailedUrl(urlFailed)
  }, [handleFailedUrl, urlFailed])

  return (
    <video ref={videoRef} style={{ width: '900px', height: '600px' }} autoPlay controls></video>
  )
}