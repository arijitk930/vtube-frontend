import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getUserPlaylists } from "../../api/playlists.api";

export function useUserPlaylists(userId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["userPlaylists", userId],
    queryFn: () => getUserPlaylists(userId, token),
    enabled: !!userId && !!token,
    select: (res) => res.data,
  });
}
