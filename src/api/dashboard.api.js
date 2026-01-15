import { fetcher } from "./fetcher";

export const getChannelStats = (token) => {
  return fetcher("/dashboard/stats", { token });
};

export const getDashboardVideos = (page = 1, limit = 10, sortType = "desc", token) => {
  return fetcher(`/dashboard/videos?page=${page}&limit=${limit}&sortType=${sortType}`, {
    token,
  });
};

