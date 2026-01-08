import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../api/fetcher";

export const useLogin = (onSuccess) => {
  return useMutation({
    mutationFn: (credentials) =>
      fetcher("/users/login", {
        method: "POST",
        body: credentials,
      }),
    onSuccess,
  });
};
