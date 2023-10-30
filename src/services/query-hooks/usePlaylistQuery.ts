import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../api";
import { ChannelListUrl, QueryKeys } from "./types";
import { useMemo } from "react";

export function usePlaylistQuery(list?: ChannelListUrl) {

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: [`${QueryKeys.GetPlaylist}/${list}`],
    queryFn: () => {
      if (list) {
        return getPlaylist(list)
      }
    },
    refetchOnWindowFocus: false,
  })

  console.log(`${QueryKeys.GetPlaylist}/${list}`);


  return useMemo(() => ({
    isError, isLoading, data, refetch
  }), [data, isError, isLoading, refetch])
}