import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getDashboardVideos } from "../../api/dashboard.api";

export function useDashboardVideos(page = 1, limit = 10, sortType = "desc") {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["dashboardVideos", page, limit, sortType],
    queryFn: () => getDashboardVideos(page, limit, sortType, token),
    enabled: !!token,
    select: (res) => res.data,
  });
}

