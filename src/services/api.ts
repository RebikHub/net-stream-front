async function baseApi(url: string, config?: any) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url, config);

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
  const eventSource = new EventSource(import.meta.env.VITE_API_URL + '/video/stats');

  // Назначаем обработчик для сообщений от сервера SSE
  eventSource.addEventListener('message', (event) => {
    setData(event.data);
  });

  // Закрыть соединение SSE при размонтировании компонента
  return () => {
    eventSource.close();
  };

};
// a9172d6870e861d74e1582dabcb6cad4f5de9351