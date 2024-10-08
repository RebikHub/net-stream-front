import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { postMovie } from '../api'

export const usePostMovie = (): {
  mutate: UseMutateFunction<any, Error, any, unknown>
  magnet?: { link: string, hash: string }
  isPending: boolean
  reset: () => void
} => {
  const { mutate, data, isPending, reset } = useMutation({ mutationFn: postMovie })
  return {
    mutate,
    magnet: data,
    isPending,
    reset
  }
}
