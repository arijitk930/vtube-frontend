import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useCurrentUser() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetcher("/users/current-user", { token });
      return res.data;
    },

    enabled: !!true,
  });
}
