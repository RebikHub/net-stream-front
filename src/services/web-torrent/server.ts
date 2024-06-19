import { ResponseStreamAddMagnet, getStreamAddMagnet, getStreamStop } from '../api'

export const useStreamServer = (): {
  addMagnet: (magnet: string) => Promise<ResponseStreamAddMagnet>
  stopStream: (magnet: string) => Promise<any>
} => {
  const addMagnet = async (magnet: string): Promise<ResponseStreamAddMagnet> => {
    const response = await getStreamAddMagnet(magnet)
    return response
  }

  const stopStream = async (magnet: string): Promise<any> => {
    return await getStreamStop(magnet)
  }

  return {
    addMagnet,
    stopStream
  }
}
