import { fetcher, fileUploadFetcher } from "./fetcher";

/**
 * Upload video with files (video and thumbnail)
 * Uses fileUploadFetcher for progress tracking
 */
export const publishVideo = async (formData, token, onProgress, signal) => {
  return fileUploadFetcher("/videos", {
    method: "POST",
    formData,
    token,
    onProgress,
    signal,
  });
};

/**
 * Toggle publish status of a video
 */
export const togglePublishStatus = (videoId, token) => {
  return fetcher(`/videos/toggle/publish/${videoId}`, {
    method: "PATCH",
    token,
  });
};

/**
 * Delete a video
 */
export const deleteVideo = (videoId, token) => {
  return fetcher(`/videos/${videoId}`, {
    method: "DELETE",
    token,
  });
};

/**
 * Update video details (title, description, thumbnail)
 */
export const updateVideo = async (
  videoId,
  formData,
  token,
  onProgress,
  signal
) => {
  return fileUploadFetcher(`/videos/${videoId}`, {
    method: "PATCH",
    formData,
    token,
    onProgress,
    signal,
  });
};
