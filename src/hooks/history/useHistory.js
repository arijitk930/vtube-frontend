import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../api/fetcher";

export function useHistory() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["history"],
    queryFn: () => fetcher("/users/history", { token }),
    enabled: !!token,
  });
}
