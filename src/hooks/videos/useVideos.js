import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useVideos({
  limit = 5,
  sortBy = "createdAt",
  sortType = "desc",
} = {}) {
  const { token } = useAuth();

  return useInfiniteQuery({
    queryKey: ["videos", limit, sortBy, sortType],
    queryFn: ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        page: pageParam,
        limit,
        sortBy,
        sortType,
      }).toString();

      return fetcher(`/videos?${query}`, { token });
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      return pagination?.hasNextPage ? pagination.currentPage + 1 : undefined;
    },
  });
}
