import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useAddToPlaylist(videoId) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistId) =>
      fetcher(`/playlists/add/${videoId}/${playlistId}`, {
        method: "PATCH",
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userPlaylists"]);
    },
  });
}
