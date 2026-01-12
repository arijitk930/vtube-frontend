import { useQuery } from "@tanstack/react-query";
import { getUserTweets } from "../../api/tweets.api";
import { useAuth } from "../../context/AuthContext";

export function useUserTweets(userId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["tweets", userId],
    queryFn: () => getUserTweets(userId, token),
    enabled: !!userId, // ✅ ONLY userId matters
    select: (res) => res.data,
  });
}
