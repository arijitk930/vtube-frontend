import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { togglePublishStatus } from "../../api/videos.api";

export function useTogglePublishStatus() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId) => togglePublishStatus(videoId, token),
    onSuccess: () => {
      // Invalidate dashboard videos and channel videos
      queryClient.invalidateQueries(["dashboardVideos"]);
      queryClient.invalidateQueries(["channelVideos"]);
      queryClient.invalidateQueries(["videos"]);
    },
  });
}

