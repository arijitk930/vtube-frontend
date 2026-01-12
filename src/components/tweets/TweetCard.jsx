import { useAuth } from "../../context/AuthContext";
import { useDeleteTweet } from "../../hooks/tweets/useDeleteTweet";

function TweetCard({ tweet }) {
  const { user } = useAuth();
  const { mutate } = useDeleteTweet();

  const isOwner = user?._id === tweet.owner._id;

  return (
    <div className="border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={tweet.owner.avatar}
            alt={tweet.owner.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white text-sm font-medium">
            @{tweet.owner.username}
          </span>
        </div>

        {isOwner && (
          <button
            onClick={() => mutate(tweet._id)}
            className="text-xs text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        )}
      </div>

      <p className="text-gray-200 mt-2">{tweet.content}</p>
    </div>
  );
}

export default TweetCard;
