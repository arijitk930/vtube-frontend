import { useState } from "react";
import ChannelVideos from "./ChannelVideos";
import ChannelSubscribed from "./ChannelSubscribed";

function ChannelTabs({ channel, isOwner }) {
  const [activeTab, setActiveTab] = useState("Videos");

  const tabs = isOwner
    ? ["Videos", "Playlists", "Subscribed", "About"]
    : ["Videos", "Playlists", "About"];

  return (
    <div className="mt-6">
      {/* Tabs header */}
      <div className="flex gap-8 border-b border-gray-800 text-sm text-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition ${
              activeTab === tab
                ? "text-purple-400 border-b-2 border-purple-500"
                : "hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="mt-6 text-gray-400">
        {activeTab === "Videos" && <ChannelVideos channelId={channel._id} />}
        {activeTab === "Playlists" && <p>Playlists coming soon</p>}
        {activeTab === "Subscribed" && isOwner && (
          <ChannelSubscribed channelId={channel._id} />
        )}
      </div>
    </div>
  );
}

export default ChannelTabs;
