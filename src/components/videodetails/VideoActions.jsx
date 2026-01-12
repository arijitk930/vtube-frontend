import LikeButton from "../likes/LikeButton";
import SaveButton from "../playlist/SaveButton";
import { FiThumbsDown, FiShare2 } from "react-icons/fi";

function VideoActions({ videoId, likes, isLikedByUser }) {
  return (
    <div className="relative mt-3">
      {/* LEFT ACTIONS */}
      <div className="flex items-center gap-3">
        <LikeButton
          videoId={videoId}
          likes={likes}
          isLikedByUser={isLikedByUser}
        />

        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm text-white">
          <FiThumbsDown size={16} />
          Dislike
        </button>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="absolute right-0 top-0 flex items-center gap-3">
        <SaveButton videoId={videoId} />

        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full text-sm text-white">
          <FiShare2 size={16} />
          Share
        </button>
      </div>
    </div>
  );
}

export default VideoActions;
