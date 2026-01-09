import { useState } from "react";
import { useVideos } from "../hooks/videos/useVideos.js";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

function Feed() {
  const [page, setPage] = useState(1);

  const {
    data: user,
    isPending: isUserLoading,
    error: userError,
  } = useCurrentUser();

  const videosQuery = useVideos({
    page,
    limit: 5,
    sortBy: "createdAt",
    sortType: "desc",
    userId: user?._id,
  });

  // 1️⃣ User loading first
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading user...
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Failed to load user
      </div>
    );
  }

  // 2️⃣ Videos loading
  if (videosQuery.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading videos...
      </div>
    );
  }

  if (videosQuery.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Failed to load videos
      </div>
    );
  }

  const videos = videosQuery.data?.data?.videos ?? [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Video Feed</h1>

      <div className="space-y-4">
        {videos.map(function (video) {
          return (
            <div key={video._id} className="bg-gray-900 p-4 rounded">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-400">{video.description}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={function () {
            setPage(page - 1);
          }}
        >
          Prev
        </button>

        <button
          className="bg-gray-700 px-4 py-2 rounded"
          onClick={function () {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Feed;
