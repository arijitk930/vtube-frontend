import { fetcher } from "./fetcher";

export const toggleSubscription = (channelId, token) =>
  fetcher(`/subscriptions/c/${channelId}`, {
    method: "POST",
    token,
  });

export const checkIsSubscribed = (channelId, token) =>
  fetcher(`/subscriptions/is-subscribed/${channelId}`, {
    token,
  });

export const getChannelSubscribers = (channelId, token) =>
  fetcher(`/subscriptions/c/${channelId}`, {
    token,
  });
