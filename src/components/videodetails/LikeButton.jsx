import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToggleVideoLike } from "../../hooks/likes/useToggleVideoLike";
import { AiOutlineLike } from "react-icons/ai";

function LikeButton({ videoId, likes = 0 }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { mutate: toggleLike, isPending } = useToggleVideoLike(videoId);

  function handleLikeClick() {
    // Guest → redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    // Logged-in → toggle like
    toggleLike();
  }

  return (
    <button
      onClick={handleLikeClick}
      disabled={isPending}
      className="
        bg-gray-800 hover:bg-gray-700 transition
        px-4 py-2 rounded-full text-sm
        flex items-center gap-2
        disabled:opacity-60
      "
    >
      <AiOutlineLike />
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;
