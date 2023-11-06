import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUpdateTvStreams } from "../api";
import { QueryKeys } from "./types";
import { useMemo, useEffect } from "react";

export function useUpdateTvStreamQuery() {
  const queryClient = useQueryClient()
  const { isError, isLoading, data, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.GetUpdateTvStreams],
    queryFn: getUpdateTvStreams,
    refetchOnWindowFocus: false,
    enabled: false
  })

  useEffect(() => {
    if (isSuccess) {
      queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetPlaylist],
        refetchType: 'all',
      })
    }

  }, [isSuccess, queryClient])


  return useMemo(() => ({
    isError, isLoading, data, refetch
  }), [data, isError, isLoading, refetch])
}