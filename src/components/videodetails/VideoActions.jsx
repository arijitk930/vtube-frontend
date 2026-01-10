import LikeButton from "./LikeButton";

function VideoActions({ videoId, likes }) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      <LikeButton videoId={videoId} likes={likes} />

      <button className="bg-gray-800 px-4 py-2 rounded-full text-sm">
        👎 Dislike
      </button>

      <button className="bg-gray-800 px-4 py-2 rounded-full text-sm">
        💾 Save
      </button>

      <button className="bg-gray-800 px-4 py-2 rounded-full text-sm">
        🔗 Share
      </button>
    </div>
  );
}

export default VideoActions;
