import VideoCard from "../VideoCard";

function HistoryList({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-gray-400">You haven’t watched any videos yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default HistoryList;
