const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Upload video with files (video and thumbnail)
 * Uses XMLHttpRequest for progress tracking
 */
export const publishVideo = async (formData, token, onProgress, signal) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });
    }

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch {
          reject(new Error("Failed to parse response"));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.message || "Failed to upload video"));
        } catch {
          reject(new Error("Failed to upload video"));
        }
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error occurred"));
    });

    // Handle abort
    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    // Handle cancellation signal
    if (signal) {
      signal.addEventListener("abort", () => {
        xhr.abort();
      });
    }

    // Open and send request
    xhr.open("POST", `${BASE_URL}/videos`);

    // Set authorization header if token provided
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // Send FormData (don't set Content-Type, browser will set it with boundary)
    xhr.send(formData);
  });
};
