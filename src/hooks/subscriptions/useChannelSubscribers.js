import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getChannelSubscribers } from "../../api/subscription.api";

export function useChannelSubscribers(channelId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["channelSubscribers", channelId],
    queryFn: () => getChannelSubscribers(channelId, token),
    enabled: !!channelId && !!token,
    select: (data) => data.data.totalSubscribers,
  });
}
