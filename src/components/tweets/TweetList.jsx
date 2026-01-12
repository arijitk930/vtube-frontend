import { useUserTweets } from "../../hooks/tweets/useUserTweets";
import TweetCard from "./TweetCard";

function TweetList({ userId }) {
  const { data: tweets = [], isLoading } = useUserTweets(userId);

  if (isLoading) {
    return <p className="text-gray-400">Loading tweets...</p>;
  }

  if (tweets.length === 0) {
    return <p className="text-gray-400">No tweets yet</p>;
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
}

export default TweetList;
