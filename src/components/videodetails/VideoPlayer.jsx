function VideoPlayer({ src }) {
  if (!src) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-gray-400">
        Video source not available
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        src={src}
        controls
        className="w-full h-full object-contain"
        preload="metadata"
      />
    </div>
  );
}

export default VideoPlayer;
