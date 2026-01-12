import { Link } from "react-router-dom";
import { useSubscriberCount } from "../../hooks/subscriptions/useSubscriberCount";
import SubscribeButton from "../subscription/SubscribeButton";

function ChannelInfo({ owner }) {
  const { data: subscriberCount, isLoading } = useSubscriberCount(owner?._id);

  return (
    <div className="flex items-center justify-between mt-6 border-t border-gray-800 pt-6">
      {/* LEFT: Channel Info */}
      <div className="flex items-center gap-4">
        <Link to={`/channel/${owner.username}`}>
          <img
            src={owner.avatar}
            alt={owner.fullName}
            className="w-11 h-11 rounded-full object-cover hover:opacity-90 transition"
          />
        </Link>

        {/* Clickable Channel Info */}
        <Link to={`/channel/${owner.username}`} className="flex flex-col group">
          {/* Name */}
          <p className="text-white font-semibold leading-tight group-hover:text-purple-400 transition">
            {owner.fullName}
          </p>

          {/* Username + Subscribers */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="group-hover:text-gray-300 transition">
              @{owner.username}
            </span>
            <span className="text-gray-600">•</span>
            <span>
              {isLoading ? "Loading..." : `${subscriberCount} subscribers`}
            </span>
          </div>
        </Link>
      </div>

      {/* RIGHT: Action */}
      <SubscribeButton channelId={owner._id} />
    </div>
  );
}

export default ChannelInfo;
