import { fetcher } from "./fetcher";

export const getUserPlaylists = (userId, token) => {
  return fetcher(`/playlists/user/${userId}`, { token });
};
