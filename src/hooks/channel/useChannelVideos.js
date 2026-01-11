import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getChannelVideos } from "../../api/channelVideos.api";

export function useChannelVideos(channelId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["channelVideos", channelId],
    queryFn: () => getChannelVideos(channelId, token),
    enabled: !!channelId && !!token,
    select: (res) => res.data.videos,
  });
}
