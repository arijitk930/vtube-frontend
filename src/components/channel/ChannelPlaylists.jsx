import { Link } from "react-router-dom";
import { useUserPlaylists } from "../../hooks/playlists/useUserPlaylists";

function ChannelPlaylists({ channelId }) {
  const { data: playlists, isLoading } = useUserPlaylists(channelId);

  if (isLoading) {
    return <p className="text-gray-400 mt-6">Loading playlists…</p>;
  }

  if (!playlists || playlists.length === 0) {
    return <p className="text-gray-400 mt-6">No playlists yet</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {playlists.map((playlist) => (
        <Link
          key={playlist._id}
          to={`/playlist/${playlist._id}`}
          className="group"
        >
          <div className="relative rounded-lg overflow-hidden bg-gray-900">
            {/* Thumbnail placeholder */}
            <div className="h-40 bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">
                {playlist.videos.length} videos
              </span>
            </div>

            {/* Meta */}
            <div className="p-4">
              <p className="text-white font-medium group-hover:text-purple-400 transition">
                {playlist.name}
              </p>
              <p className="text-sm text-gray-400 line-clamp-2">
                {playlist.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChannelPlaylists;
