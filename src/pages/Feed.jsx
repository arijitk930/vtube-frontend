import { useState } from "react";
import { useVideos } from "../hooks/videos/useVideos.js";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import VideoCard from "../components/VideoCard";

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
  console.log(videos);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Video Feed</h1>

      {/* ✅ GRID START */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
      {/* ✅ GRID END */}

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="bg-gray-700 px-4 py-2 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Feed;
