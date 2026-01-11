import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useLikedVideos() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["likedVideos"],
    queryFn: () => fetcher("/likes/videos", { token }),
    enabled: !!token,
  });
}
