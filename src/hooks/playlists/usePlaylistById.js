import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function usePlaylistById(playlistId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => fetcher(`/playlists/${playlistId}`, { token }),
    enabled: !!playlistId && !!token,
    select: (res) => res.data,
  });
}
