import { fetcher } from "./fetcher";

export const getChannelVideos = (channelId, token) => {
  return fetcher(`/videos?userId=${channelId}`, {
    token,
  });
};
