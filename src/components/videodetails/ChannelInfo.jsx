import SubscribeButton from "../subscription/SubscribeButton";

function ChannelInfo({ owner }) {
  if (!owner) return null;

  return (
    <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
      {/* Channel Info */}
      <div className="flex items-center gap-3">
        <img
          src={owner.avatar}
          alt={owner.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="text-white font-medium leading-tight">
            {owner.fullName}
          </p>
          <p className="text-sm text-gray-400">@{owner.username}</p>
        </div>
      </div>

      {/* Subscribe Button */}
      <SubscribeButton channelId={owner._id} />
    </div>
  );
}

export default ChannelInfo;
