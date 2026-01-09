function VideoActions() {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      <button className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm">
        👍 Like
      </button>

      <button className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm">
        👎 Dislike
      </button>

      <button className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm">
        💾 Save
      </button>

      <button className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm">
        🔗 Share
      </button>
    </div>
  );
}

export default VideoActions;
