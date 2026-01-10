import { useEffect } from "react";
import { useVideos } from "../hooks/videos/useVideos";
import VideoCard from "../components/VideoCard";

function Feed() {
  const {
    data,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useVideos({
    limit: 6,
    sortBy: "createdAt",
    sortType: "desc",
  });

  // Auto-load next page on scroll bottom
  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading feed...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Failed to load feed
      </div>
    );
  }

  const videos = data?.pages.flatMap((page) => page.data.videos) ?? [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Video Feed</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="text-center text-gray-400 mt-6">
          Loading more videos...
        </div>
      )}
    </div>
  );
}

export default Feed;
