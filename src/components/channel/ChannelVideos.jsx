import { useChannelVideos } from "../../hooks/channel/useChannelVideos";
import VideoCard from "../VideoCard";

function ChannelVideos({ channelId }) {
  const { data: videos, isLoading, error } = useChannelVideos(channelId);

  if (isLoading) {
    return <p className="text-gray-400 mt-6">Loading videos...</p>;
  }

  if (error) {
    return <p className="text-red-500 mt-6">Failed to load videos</p>;
  }

  if (!videos || videos.length === 0) {
    return <p className="text-gray-400 mt-6">No videos uploaded yet</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default ChannelVideos;
