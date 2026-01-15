import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getChannelStats } from "../../api/dashboard.api";

export function useChannelStats() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["channelStats"],
    queryFn: () => getChannelStats(token),
    enabled: !!token,
    select: (res) => res.data,
  });
}

