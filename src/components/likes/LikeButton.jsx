import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToggleVideoLike } from "../../hooks/likes/useToggleVideoLike";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

function LikeButton({ videoId, likes = 0, isLikedByUser = false }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { mutate: toggleLike, isPending } = useToggleVideoLike(videoId);

  function handleLikeClick() {
    if (!token) {
      navigate("/login");
      return;
    }

    toggleLike();
  }

  return (
    <button
      onClick={handleLikeClick}
      disabled={isPending}
      className={`
        px-4 py-2 rounded-full text-sm flex items-center gap-2
        transition disabled:opacity-60
        ${
          isLikedByUser
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-800 hover:bg-gray-700"
        }
      `}
    >
      {isLikedByUser ? (
        <AiFillLike className="text-white" />
      ) : (
        <AiOutlineLike className="text-white" />
      )}

      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;
