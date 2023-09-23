async function baseApi(url: string, config?: any) {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + url, config);

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export const getPlaylist = async () => {
  return await baseApi('/tv/playlist')
}

export const getUpdateTvStreams = async () => {
  return await baseApi('/tv/update')
}

export const postTorrentLink = async (magnetLink: string) => {
  return await baseApi('/video/download', {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({
      magnetLink
    }
    )
  })
}


export const getSSEData = async (setData: any) => {

  // Парсим поток событий (SSE)
  const eventSource = new EventSource(process.env.REACT_APP_API_URL + '/video/stats');

  // Назначаем обработчик для сообщений от сервера SSE
  eventSource.addEventListener('message', (event) => {
    setData(event.data);
  });

  // Закрыть соединение SSE при размонтировании компонента
  return () => {
    eventSource.close();
  };

};