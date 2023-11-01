import { useState, useMemo } from 'react'
import { getVideoStream } from '../services/api';

export const Torrent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideo, setActiveVideo] = useState<any>({});
  const findMovie = async () => {
    try {
      const response = await getVideoStream(searchTerm)

      console.log(response);


      setActiveVideo({
        link: searchTerm,
        name: response[0].name,
      });
    } catch (error) {
      console.error(error);
    }

  }

  const videoUrl = useMemo(() => activeVideo.name
    ? `/video/${activeVideo.link}/${activeVideo.name}`
    : '', [activeVideo.link, activeVideo.name]);

  return (
    <div>
      <video src={videoUrl} controls></video>
      <input
        type="search"
        placeholder="Поиск фильма"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={findMovie}>Найти</button>
    </div>
  )
}