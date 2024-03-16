import { useQuery } from "@tanstack/react-query"
import { getSearchMovie } from "../api"
import { QueryKeys } from "./types"
import { useMemo } from "react"

export const useScanSearchMovie = (movie: string, filter: number) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [`${QueryKeys.GetScanSearchMovie}/${filter}/${movie}`],
    queryFn: () => getSearchMovie(movie, filter),
    refetchOnWindowFocus: false,
    enabled: false,
  })

  return useMemo(() => ({
    searchMovieData: data,
    getSearchMovie: refetch,
    isLoading
  }), [data, isLoading, refetch])
}