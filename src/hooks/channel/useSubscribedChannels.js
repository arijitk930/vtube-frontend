import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getSubscribedChannels } from "../../api/subscriptions.api";

export function useSubscribedChannels(subscriberId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["subscribedChannels", subscriberId],
    queryFn: () => getSubscribedChannels(subscriberId, token),
    enabled: !!subscriberId && !!token,
    select: (res) => res.data.subscriptions,
  });
}
