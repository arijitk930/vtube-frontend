import { fetcher } from "./fetcher";

export const getSubscribedChannels = (subscriberId, token) => {
  return fetcher(`/subscriptions/u/${subscriberId}`, {
    token,
  });
};
