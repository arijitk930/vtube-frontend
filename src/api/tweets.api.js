import { fetcher } from "./fetcher";

export const getUserTweets = (userId, token) =>
  fetcher(`/tweets/user/${userId}`, { token });

export const createTweet = (content, token) =>
  fetcher("/tweets", {
    method: "POST",
    body: content,
    token,
  });

export const deleteTweet = (tweetId, token) =>
  fetcher(`/tweets/${tweetId}`, {
    method: "DELETE",
    token,
  });
