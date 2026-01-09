import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useVideos(params) {
  const { token } = useAuth();

  const {
    page = 1,
    limit = 5,
    sortBy = "asc",
    sortType = "asc",
    userId,
  } = params;

  return useQuery({
    queryKey: ["videos", page, limit, sortBy, sortType, userId],
    queryFn: function () {
      const query = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortType,
        userId,
      }).toString();

      return fetcher(`/videos?${query}`, { token });
    },
    keepPreviousData: true,
    enabled: !!token && !!userId,
  });
}
