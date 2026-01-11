import { FiEdit2 } from "react-icons/fi";

function EditChannelButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-full
        border border-gray-600
        text-sm font-medium
        text-white
        hover:bg-gray-800
        active:scale-95
        transition
      "
    >
      <FiEdit2 className="text-base" />
      Edit Channel
    </button>
  );
}

export default EditChannelButton;
