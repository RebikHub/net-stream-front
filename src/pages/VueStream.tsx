import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VueStream() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideo, setActiveVideo] = useState<any>({});
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    getMyMovies();
  }, []);

  const videoUrl = activeVideo.fileName
    ? `/stream/${activeVideo.magnet}/${activeVideo.fileName}`
    : '';

  const play = async (file: any) => {
    try {
      const response = await axios.get(`/stream/add/${file.magnet}`);
      console.log(response.data);
      setActiveVideo({
        magnet: file.magnet,
        fileName: response.data[0].name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const findMovie = async () => {
    try {
      const response = await axios.get(`/movies/search?searchTerm=${searchTerm}`);
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMyMovies = async () => {
    try {
      const response = await axios.get(`/movies`);
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app">
      <video src={videoUrl} controls></video>
      <hr />
      <input
        type="search"
        placeholder="Поиск фильма"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={findMovie}>Найти</button>
      <ul>
        {files.map((file: any) => (
          <li key={file.magnet}>
            {file.title}
            <button onClick={() => play(file)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VueStream;
