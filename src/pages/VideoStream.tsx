import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const infoHash = 'd4a8dbcea3b3eee8ff4ec76b79602a22aecfd85c'; // Замените на свою магнет-ссылку

  useEffect(() => {
    const video = videoRef.current;
    const source = `http://localhost:8000/video/stream/${infoHash}/name.mkv`;

    if (video) {
      video.src = source;
      video.load();
      video.play();
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} controls width="640" height="360" />
    </div>
  );
};

export default VideoStream;
