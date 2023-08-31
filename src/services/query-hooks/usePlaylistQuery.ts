import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../api";
import { QueryKeys } from "./types";
import { useMemo } from "react";

export function usePlaylistQuery() {
  const { isError, isLoading, data } = useQuery({
    queryKey: [QueryKeys.GetPlaylist],
    queryFn: getPlaylist,
    refetchOnWindowFocus: false,
  })

  return useMemo(() => ({
    isError, isLoading, data
  }), [data, isError, isLoading])
}