import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { checkIsSubscribed } from "../../api/subscription.api";

export function useIsSubscribed(channelId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["isSubscribed", channelId],
    queryFn: () => checkIsSubscribed(channelId, token),
    enabled: !!channelId && !!token,
    select: (data) => data.data.isSubscribed,
  });
}
