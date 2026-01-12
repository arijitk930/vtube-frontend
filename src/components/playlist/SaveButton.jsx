import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import SaveToPlaylist from "./SaveToPlaylist.jsx";

function SaveButton({ videoId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center gap-2
          bg-gray-800 hover:bg-gray-700
          transition
          px-4 py-2
          rounded-full
          text-sm text-white
        "
      >
        <MdPlaylistAdd size={18} />
        Save
      </button>

      {open && (
        <SaveToPlaylist videoId={videoId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default SaveButton;
