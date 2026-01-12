import { useParams } from "react-router-dom";
import { usePlaylistById } from "../hooks/playlists/usePlaylistById";
import VideoCard from "../components/ui/VideoCard";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const { data: playlist, isLoading } = usePlaylistById(playlistId);

  if (isLoading) {
    return <p className="text-gray-400">Loading playlist…</p>;
  }

  return (
    <div className="flex gap-8">
      {/* Left */}
      <div className="w-1/3">
        <h1 className="text-xl font-semibold text-white">{playlist.name}</h1>
        <p className="text-gray-400 mt-2">{playlist.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          {playlist.videos.length} videos
        </p>
      </div>

      {/* Right */}
      <div className="flex-1 space-y-4">
        {playlist.videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetail;
