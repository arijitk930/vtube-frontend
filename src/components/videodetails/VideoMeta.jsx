function VideoMeta({ video }) {
  if (!video) return null;

  const formattedDate = new Date(video.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="space-y-1">
      <h1 className="text-xl font-semibold text-white">{video.title}</h1>

      <p className="text-sm text-gray-400">
        {video.views} views • {formattedDate}
      </p>
    </div>
  );
}

export default VideoMeta;
