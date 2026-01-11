import SubscribeButton from "../subscription/SubscribeButton";
import EditChannelButton from "./EditChannelButton";

function ChannelHeader({ channel, isOwner }) {
  return (
    <div className="border-b border-gray-800">
      {/* COVER IMAGE */}
      <div className="w-full h-48 bg-gray-800 overflow-hidden">
        {channel.coverImage ? (
          <img
            src={channel.coverImage}
            alt={`${channel.fullName} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          // fallback if no cover image
          <div className="w-full h-full bg-linear-to-r from-gray-800 to-gray-700" />
        )}
      </div>

      {/* CHANNEL INFO */}
      <div className="flex items-center justify-between px-6 py-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <img
            src={channel.avatar}
            alt={channel.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-black -mt-12"
          />

          <div>
            <h1 className="text-xl font-semibold text-white">
              {channel.fullName}
            </h1>
            <p className="text-gray-400">@{channel.username}</p>
          </div>
        </div>

        {/* Right (Action Button) */}
        {isOwner ? (
          <EditChannelButton />
        ) : (
          <SubscribeButton channelId={channel._id} />
        )}
      </div>
    </div>
  );
}

export default ChannelHeader;
