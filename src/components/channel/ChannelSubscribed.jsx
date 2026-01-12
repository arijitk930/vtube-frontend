import { useSubscribedChannels } from "../../hooks/channel/useSubscribedChannels";
import SubscribeButton from "../subscription/SubscribeButton";
import { Link } from "react-router-dom";

function ChannelSubscribed({ channelId }) {
  const { data: channels, isLoading, error } = useSubscribedChannels(channelId);

  if (isLoading) {
    return <p className="text-gray-400 mt-6">Loading channels…</p>;
  }

  if (error) {
    return <p className="text-red-500 mt-6">Failed to load subscriptions</p>;
  }

  if (!channels || channels.length === 0) {
    return <p className="text-gray-400 mt-6">No subscriptions yet</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {channels.map((sub) => {
        const channel = sub.channel;

        return (
          <div
            key={channel._id}
            className="
              flex items-center justify-between
              p-4 rounded-lg
              border border-gray-800
              hover:border-gray-700
              hover:bg-gray-900/40
              transition
            "
          >
            {/* Clickable Channel Info */}
            <Link
              to={`/channel/${channel.username}`}
              className="flex items-center gap-4 group"
            >
              <img
                src={channel.avatar}
                alt={channel.fullName}
                className="
                  w-12 h-12 rounded-full object-cover
                  group-hover:opacity-90
                  transition
                "
              />

              <div className="flex flex-col">
                <p className="text-white font-medium group-hover:text-purple-400 transition">
                  {channel.fullName}
                </p>
                <p className="text-sm text-gray-400">@{channel.username}</p>
              </div>
            </Link>

            {/* Subscribe toggle (kept isolated) */}
            <SubscribeButton channelId={channel._id} />
          </div>
        );
      })}
    </div>
  );
}

export default ChannelSubscribed;
