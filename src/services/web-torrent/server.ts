import { getStreamAddMagnet, getStreamStop } from "../api";

export const useStreamServer = () => {
  const addMagnet = async (magnet: string) => {
    const response = await getStreamAddMagnet(magnet);
    return response;
  };

  const stopStream = async (magnet: string) => {
    return await getStreamStop(magnet);
  };

  return {
    addMagnet,
    stopStream,
  };
};
