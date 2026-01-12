import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { createTweet } from "../../api/tweets.api";

export function useCreateTweet(userId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => createTweet(content, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", userId]);
    },
  });
}
