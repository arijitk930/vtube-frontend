import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { deleteTweet } from "../../api/tweets.api";

export function useDeleteTweet(userId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweetId) => deleteTweet(tweetId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", userId]);
    },
  });
}
