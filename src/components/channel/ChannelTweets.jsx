import { useAuth } from "../../context/AuthContext";
import TweetComposer from "../tweets/TweetComposer";
import TweetList from "../tweets/TweetList";

function ChannelTweets({ channel }) {
  const { user, token } = useAuth();
  const isOwner = user?._id === channel._id;

  if (!token) {
    return <p className="text-gray-400 mt-6">Login to view tweets</p>;
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Owner-only composer */}
      {isOwner && <TweetComposer />}

      {/* Public tweet list */}
      <TweetList userId={channel._id} />
    </div>
  );
}

export default ChannelTweets;
