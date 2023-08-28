import { VideoOptionsType } from "../pages/Home"


export const Video = ({ options }: { options: VideoOptionsType }) => {
  return (
    <video autoPlay={options.autoplay} controls={options.controls}>
      {
        options.sources.map((source, i) => (
          <source key={i} src={source.src} type={'video/mp4'} />
        ))
      }
    </video>
  )
}