import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useSubscriberCount(channelId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["subscriberCount", channelId],
    queryFn: () => fetcher(`/subscriptions/c/${channelId}`, { token }),
    enabled: !!channelId && !!token,
    select: (res) => res.data.totalSubscribers,
  });
}
