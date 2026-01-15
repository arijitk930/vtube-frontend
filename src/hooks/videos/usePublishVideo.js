import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { publishVideo } from "../../api/videos.api";
import { useRef } from "react";

export function usePublishVideo(channelId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const abortControllerRef = useRef(null);

  return {
    ...useMutation({
      mutationFn: ({ formData, onProgress }) => {
        // Create abort controller for cancellation
        abortControllerRef.current = new AbortController();
        return publishVideo(
          formData,
          token,
          onProgress,
          abortControllerRef.current.signal
        );
      },
      onSuccess: () => {
        // Invalidate channel videos to refresh the list
        queryClient.invalidateQueries(["channelVideos", channelId]);
        // Also invalidate all videos query in case user navigates to home/feed
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
