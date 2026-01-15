import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { updateVideo } from "../../api/videos.api";
import { useRef } from "react";

export function useUpdateVideo() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const abortControllerRef = useRef(null);

  return {
    ...useMutation({
      mutationFn: ({ videoId, formData, onProgress }) => {
        abortControllerRef.current = new AbortController();
        return updateVideo(
          videoId,
          formData,
          token,
          onProgress,
          abortControllerRef.current.signal
        );
      },
      onSuccess: () => {
        // Invalidate dashboard videos and channel videos
        queryClient.invalidateQueries(["dashboardVideos"]);
        queryClient.invalidateQueries(["channelVideos"]);
        queryClient.invalidateQueries(["videos"]);
      },
    }),
    cancel: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
  };
}

