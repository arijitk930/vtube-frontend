import { useParams } from "react-router-dom";
import { useVideoByID } from "../hooks/videos/useVideoByID";

import VideoPlayer from "../components/videodetails/VideoPlayer";
import VideoMeta from "../components/videodetails/VideoMeta";
import VideoActions from "../components/videodetails/VideoActions";
import ChannelInfo from "../components/videodetails/ChannelInfo";
import VideoDescription from "../components/videodetails/VideoDescription";

import AddComment from "../components/comments/AddComment";
import CommentList from "../components/comments/CommentList";
import { useComments } from "../hooks/comments/useComments";

function VideoDetail() {
  const { id } = useParams();

  const { data, isPending, error } = useVideoByID(id);
  const { data: commentsData } = useComments(id);

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
  const comments = commentsData?.data?.comments ?? [];

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
        <VideoPlayer src={video.videoFile} videoId={video._id} />

        <VideoMeta video={video} />

        <VideoActions
          videoId={video._id}
          likes={video.likes}
          isLikedByUser={video.isLikedByUser}
        />

        <ChannelInfo owner={video.owner} />

        <VideoDescription description={video.description} />

        {/* COMMENTS */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-2">
            {comments.length} Comments
          </h2>

          <AddComment videoId={id} />
          <CommentList comments={comments} />
        </section>
      </div>
    </div>
  );
}

export default VideoDetail;
