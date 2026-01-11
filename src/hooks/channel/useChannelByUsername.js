import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../api/fetcher";
import { useAuth } from "../../context/AuthContext";

export function useChannelByUsername(username) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["channel", username],
    queryFn: () =>
      fetcher(`/users/c/${username}`, {
        token,
      }),
    enabled: !!username && !!token,
    select: (data) => data.data,
  });
}
