import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useCreatePlaylist() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      fetcher("/playlists", {
        method: "POST",
        body: payload,
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userPlaylists"]);
    },
  });
}
