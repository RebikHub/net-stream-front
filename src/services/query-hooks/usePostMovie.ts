import { useMutation } from "@tanstack/react-query"
import { postMovie } from "../api"

export const usePostMovie = () => {
  const { mutate, data, isPending, reset } = useMutation({ mutationFn: postMovie });

  return {
    mutate,
    magnet: data,
    isPending,
    reset,
  }
}