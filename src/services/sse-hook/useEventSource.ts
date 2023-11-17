import { useEffect, useRef } from "react";

export const useEventSource = ({ setData, infoHash }: { setData: any, infoHash: string }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const source = useRef<EventSource>()

  useEffect(() => {
    if (infoHash) {
      source.current = new EventSource(baseUrl + `/video/stream/stats/${infoHash}`);

      source.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setData(data);
      };

      source.current.onerror = (error) => {
        console.error('SSE Error:', error);
      };

    }

    return () => {
      source.current?.close();
    };
  }, [baseUrl, infoHash, setData]);

  return source.current;
}
