import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserPlaylists } from "../../hooks/playlists/useUserPlaylists";
import { useAddToPlaylist } from "../../hooks/playlists/useAddToPlaylist";
import { useRemoveFromPlaylist } from "../../hooks/playlists/useRemoveFromPlaylist";
import { useCreatePlaylist } from "../../hooks/playlists/useCreatePlaylist";
import Portal from "../ui/Portal";

function SaveToPlaylist({ videoId, onClose }) {
  const { user } = useAuth();
  const [newName, setNewName] = useState("");

  const { data: playlists = [] } = useUserPlaylists(user?._id);
  const addMutation = useAddToPlaylist(videoId);
  const removeMutation = useRemoveFromPlaylist(videoId);
  const createMutation = useCreatePlaylist();

  const toggle = (playlist) => {
    const exists = playlist.videos.includes(videoId);
    exists
      ? removeMutation.mutate(playlist._id)
      : addMutation.mutate(playlist._id);
  };

  const create = () => {
    if (!newName.trim()) return;
    createMutation.mutate({
      name: newName,
      description: "",
    });
    setNewName("");
  };

  return (
    <Portal>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="p-4 bg-gray-900 rounded-lg w-64 shadow-xl">
          <p className="text-white mb-2 font-medium">Save to playlist</p>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {playlists.map((p) => (
              <label
                key={p._id}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={p.videos.includes(videoId)}
                  onChange={() => toggle(p)}
                />
                {p.name}
              </label>
            ))}
          </div>

          <div className="mt-4">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New playlist name"
              className="w-full px-2 py-1 text-sm rounded bg-gray-800 text-white"
            />
            <button
              onClick={create}
              className="w-full mt-2 py-1 bg-purple-600 rounded text-sm"
            >
              Create playlist
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default SaveToPlaylist;
