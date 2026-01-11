import { useRef } from "react";
import { fetcher } from "../../api/fetcher";
import { useAuth } from "../../context/AuthContext";

function VideoPlayer({ src, videoId }) {
  const hasCounted = useRef(false);
  const { token } = useAuth();

  function handleTimeUpdate(e) {
    if (hasCounted.current) return;

    const currentTime = e.target.currentTime;

    // ✅ Count view only after 2 seconds of actual playback
    if (currentTime >= 2) {
      fetcher(`/videos/${videoId}/view`, {
        method: "POST",
        token: token || undefined,
      });
      hasCounted.current = true;
    }
  }

  if (!src) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-gray-400">
        Video source not available
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={src}
        controls
        className="w-full h-full object-contain"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate} // 👈 KEY CHANGE
      />
    </div>
  );
}

export default VideoPlayer;
