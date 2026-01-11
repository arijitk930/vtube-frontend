import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { toggleSubscription } from "../../api/subscription.api";

export function useToggleSubscription(channelId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleSubscription(channelId, token),

    onSuccess: () => {
      queryClient.invalidateQueries(["isSubscribed", channelId]);
      queryClient.invalidateQueries(["channelSubscribers", channelId]);
    },
  });
}
