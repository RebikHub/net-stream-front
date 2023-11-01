import { ChannelListUrl } from "./query-hooks/types";

const baseUrl = import.meta.env.VITE_API_URL

async function baseApi(url: string, config?: any) {
  try {
    const response = await fetch(baseUrl + url, config);

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

export const getPlaylist = async (list: ChannelListUrl) => {
  return await baseApi(`/tv/playlist/${list}`)
}

export const getUpdateTvStreams = async () => {
  return await baseApi('/tv/update')
}

// video stream

export const getVideoStream = async (magnetLink: string) => {
  return await baseApi(`/video/stream/${magnetLink}`)
}

export const getPlayVideoStream = async (name: string, link: string) => {
  return await baseApi(`/video/${name}/${link}`)
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
  const eventSource = new EventSource(baseUrl + '/video/stats');

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