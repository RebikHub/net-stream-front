import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUpdateTvStreams } from "../api";
import { QueryKeys } from "./types";
import { useMemo } from "react";

export function useUpdateTvStreamQuery() {
  const queryClient = useQueryClient()
  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.GetUpdateTvStreams],
    queryFn: getUpdateTvStreams,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.GetPlaylist])
    },
    refetchOnWindowFocus: false,
    enabled: false
  })

  return useMemo(() => ({
    isError, isLoading, data, refetch
  }), [data, isError, isLoading, refetch])
}