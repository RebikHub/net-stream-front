import { useQuery } from '@tanstack/react-query'
import { getPlaylist } from '../api'
import { ChannelListUrl, QueryKeys } from './types'
import { useMemo } from 'react'

export function usePlaylistQuery (list?: ChannelListUrl) {
  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: [`${QueryKeys.GetPlaylist}/${list}`],
    queryFn: async () => {
      if (list) {
        return await getPlaylist(list)
      }
    },
    refetchOnWindowFocus: false
  })

  return useMemo(() => ({
    isError, isLoading, data, refetch
  }), [data, isError, isLoading, refetch])
}
