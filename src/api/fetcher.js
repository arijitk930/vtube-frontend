const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetcher(endpoint, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    /*     credentials: "include", */
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Read response as text first (we can only read the stream once)
  const text = await res.text();
  let data;

  // Try to parse as JSON
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      // If JSON parsing fails, it might be an HTML error page
      throw new Error(`Server error: ${res.status} ${res.statusText}. Response is not valid JSON.`);
    }
  } else {
    // If not JSON, throw error with text content
    throw new Error(`Server error: ${res.status} ${res.statusText}. ${text.substring(0, 200)}`);
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Request failed: ${res.status} ${res.statusText}`);
  }

  return data;
}

/**
 * File upload fetcher with progress tracking
 * Uses XMLHttpRequest for progress support
 */
export async function fileUploadFetcher(
  endpoint,
  { method = "POST", formData, token, onProgress, signal } = {}
) {
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
          reject(new Error(error.message || "Request failed"));
        } catch {
          reject(new Error("Request failed"));
        }
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error occurred"));
    });

    // Handle abort
    xhr.addEventListener("abort", () => {
      reject(new Error("Request cancelled"));
    });

    // Handle cancellation signal
    if (signal) {
      signal.addEventListener("abort", () => {
        xhr.abort();
      });
    }

    // Open and send request
    xhr.open(method, `${BASE_URL}${endpoint}`);

    // Set authorization header if token provided
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // Send FormData (don't set Content-Type, browser will set it with boundary)
    xhr.send(formData);
  });
}