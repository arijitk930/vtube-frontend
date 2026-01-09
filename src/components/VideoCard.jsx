function VideoCard({ video }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2 text-white">
          {video.title}
        </h2>

        <p className="text-sm text-gray-400 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
