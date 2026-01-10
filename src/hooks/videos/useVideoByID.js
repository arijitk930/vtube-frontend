import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useVideoByID(videoId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => fetcher(`/videos/${videoId}`, { token }),
    enabled: !!videoId, // 🔑 token NOT required
  });
}
