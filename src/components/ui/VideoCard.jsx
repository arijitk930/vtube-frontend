import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/videos/${video._id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group hover:bg-gray-900 rounded-2xl p-2"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {Math.floor(video.duration / 60)}:
            {String(Math.floor(video.duration % 60)).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        {/* Title */}
        <h2 className="text-white font-semibold text-sm leading-snug line-clamp-2">
          {video.title}
        </h2>

        {/* Views + time */}
        <p className="text-xs text-gray-400">
          {video.views?.toLocaleString()} views •{" "}
          {new Date(video.createdAt).toLocaleDateString()}
        </p>

        {/* Channel name */}
        <p className="text-xs text-gray-500">{video.owner?.fullName}</p>
      </div>
    </div>
  );
}

export default VideoCard;
