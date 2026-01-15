import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { deleteVideo } from "../../api/videos.api";

export function useDeleteVideo() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId) => deleteVideo(videoId, token),
    onSuccess: () => {
      // Invalidate dashboard videos and channel videos
      queryClient.invalidateQueries(["dashboardVideos"]);
      queryClient.invalidateQueries(["channelVideos"]);
      queryClient.invalidateQueries(["videos"]);
      queryClient.invalidateQueries(["channelStats"]);
    },
  });
}

