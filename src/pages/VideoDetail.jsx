import { useParams } from "react-router-dom";
import { useVideoByID } from "../hooks/videos/useVideoByID";

import VideoPlayer from "../components/videodetails/VideoPlayer";
import VideoMeta from "../components/videodetails/VideoMeta";
import VideoActions from "../components/videodetails/VideoActions";
import ChannelInfo from "../components/videodetails/ChannelInfo";
import VideoDescription from "../components/videodetails/VideoDescription";

function VideoDetail() {
  const { id } = useParams();

  const { data, isPending, error } = useVideoByID(id);

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading video...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Failed to load video
      </div>
    );
  }

  const video = data?.data;

  if (!video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <VideoPlayer src={video.videoFile} />

        <VideoMeta video={video} />

        <VideoActions />

        <ChannelInfo owner={video.owner} />

        <VideoDescription description={video.description} />
      </div>
    </div>
  );
}

export default VideoDetail;
