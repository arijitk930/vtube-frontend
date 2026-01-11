import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChannelByUsername } from "../hooks/channel/useChannelByUsername";
import ChannelHeader from "../components/channel/ChannelHeader.jsx";
import ChannelTabs from "../components/channel/ChannelTabs";

function Channel() {
  const { username: paramUsername } = useParams();
  const { user } = useAuth();

  // decide whose channel to load
  const username = paramUsername || user?.username || "";

  // always call hook
  const { data: channel, isLoading, error } = useChannelByUsername(username);

  if (isLoading) {
    return <div className="p-6 text-gray-400">Loading channel…</div>;
  }

  if (error || !channel) {
    return <div className="p-6 text-red-500">Channel not found</div>;
  }

  // 🔑 OWNERSHIP CHECK (THIS IS THE CORE FIX)
  const isOwner = user?._id === channel._id;

  return (
    <div className="px-6">
      <ChannelHeader channel={channel} isOwner={isOwner} />
      <ChannelTabs channel={channel} />
    </div>
  );
}

export default Channel;
