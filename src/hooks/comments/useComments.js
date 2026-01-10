import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../api/fetcher";
import { useAuth } from "../../context/AuthContext";

export function useComments(videoId, page = 1, limit = 10) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["comments", videoId, page],
    queryFn: () =>
      fetcher(`/comments/${videoId}?page=${page}&limit=${limit}`, { token }),
    enabled: !!videoId && !!token,
    keepPreviousData: true,
  });
}
