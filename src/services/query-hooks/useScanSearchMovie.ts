import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query'
import { ResponseSearchMovie, getSearchMovie } from '../api'
import { QueryKeys } from './types'
import { useMemo } from 'react'

export const useScanSearchMovie = (movie: string, filter: number): {
  searchMovieData?: ResponseSearchMovie
  getSearchMovie: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
  isLoading: boolean
} => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [`${QueryKeys.GetScanSearchMovie}/${filter}/${movie}`],
    queryFn: async () => await getSearchMovie(movie, filter),
    refetchOnWindowFocus: false,
    enabled: false
  })

  return useMemo(() => ({
    searchMovieData: data,
    getSearchMovie: refetch,
    isLoading
  }), [data, isLoading, refetch])
}
