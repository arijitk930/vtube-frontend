import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useToggleVideoLike(videoId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher(`/likes/toggle/v/${videoId}`, {
        method: "POST",
        token,
      }),

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async () => {
      // Cancel ongoing refetches
      await queryClient.cancelQueries(["video", videoId]);

      // Snapshot previous value
      const previousVideo = queryClient.getQueryData(["video", videoId]);

      // Optimistically update cache
      queryClient.setQueryData(["video", videoId], (old) => {
        if (!old) return old;

        const wasLiked = old.data.isLikedByUser;

        return {
          ...old,
          data: {
            ...old.data,
            likes: wasLiked ? old.data.likes - 1 : old.data.likes + 1,
            isLikedByUser: !wasLiked,
          },
        };
      });

      // Return context for rollback
      return { previousVideo };
    },

    // ❌ Rollback if API fails
    onError: (_err, _vars, context) => {
      if (context?.previousVideo) {
        queryClient.setQueryData(["video", videoId], context.previousVideo);
      }
    },

    // 🔁 Sync with backend
    onSettled: () => {
      queryClient.invalidateQueries(["video", videoId]);
    },
  });
}
