import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import ChannelVideos from "./ChannelVideos";
import ChannelSubscribed from "./ChannelSubscribed";
import ChannelPlaylists from "./ChannelPlaylists";
import ChannelTweets from "./ChannelTweets";
/* import ChannelAbout from "./ChannelAbout"; */
import Tab from "../ui/Tab";

function ChannelTabs({ channel, isOwner }) {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("Videos");

  return (
    <div className="mt-6">
      {/* ---------- Tabs header ---------- */}
      <div className="flex gap-8 border-b border-gray-800 text-sm text-gray-400">
        <Tab tab="Videos" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab
          tab="Playlists"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tweets: owner + logged-in users */}
        {token && (
          <Tab tab="Tweets" activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Subscribed: owner only */}
        {isOwner && (
          <Tab
            tab="Subscribed"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        <Tab tab="About" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* ---------- Tabs content ---------- */}
      <div className="mt-6 text-gray-400">
        {activeTab === "Videos" && <ChannelVideos channelId={channel._id} />}

        {activeTab === "Playlists" && (
          <ChannelPlaylists
            channelId={channel._id}
            username={channel.username}
          />
        )}

        {activeTab === "Tweets" && token && <ChannelTweets channel={channel} />}

        {activeTab === "Subscribed" && isOwner && (
          <ChannelSubscribed channelId={channel._id} />
        )}

        {/* {activeTab === "About" && <ChannelAbout channel={channel} />} */}
      </div>
    </div>
  );
}

export default ChannelTabs;
