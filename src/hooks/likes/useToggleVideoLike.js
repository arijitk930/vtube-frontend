import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../../api/fetcher";
import { useAuth } from "../../context/AuthContext";

export function useToggleVideoLike(videoId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return fetcher(`/likes/toggle/v/${videoId}`, {
        method: "POST",
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["video", videoId]);
    },
  });
}
