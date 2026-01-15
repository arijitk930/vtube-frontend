import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChannelStats } from "../hooks/dashboard/useChannelStats";
import { useDashboardVideos } from "../hooks/dashboard/useDashboardVideos";
import VideoCard from "../components/ui/VideoCard";
import {
  MdVideoLibrary,
  MdVisibility,
  MdThumbUp,
  MdPeople,
  MdEmail,
  MdCalendarToday,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("desc");
  const limit = 12;

  const { user } = useAuth();

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useChannelStats();

  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
  } = useDashboardVideos(page, limit, sortType);

  // Prepare chart data (mock data for now - you can enhance this with real analytics)
  const chartData = [
    { name: "Mon", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.1) : 0 },
    { name: "Tue", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.15) : 0 },
    { name: "Wed", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.12) : 0 },
    { name: "Thu", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.18) : 0 },
    { name: "Fri", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.2) : 0 },
    { name: "Sat", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.15) : 0 },
    { name: "Sun", views: stats?.totalViews ? Math.floor(stats.totalViews * 0.1) : 0 },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toLocaleString() || 0;
  };

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{formatNumber(value)}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`${color} text-2xl`} />
        </div>
      </div>
    </div>
  );

  if (statsLoading || videosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (statsError || videosError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-2">
            {statsError?.message || videosError?.message || "Failed to load dashboard"}
          </p>
          <p className="text-gray-400">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const videos = videosData?.videos || [];
  const pagination = videosData?.pagination || {};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Monitor your channel performance</p>
        </div>

        {/* Channel Owner Details */}
        {user && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <Link to={`/channel/${user.username}`}>
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover hover:opacity-90 transition cursor-pointer border-2 border-purple-600"
                />
              </Link>

              {/* Owner Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Link to={`/channel/${user.username}`}>
                      <h2 className="text-2xl font-bold text-white hover:text-purple-400 transition mb-1">
                        {user.fullName}
                      </h2>
                    </Link>
                    <p className="text-gray-400 text-lg">@{user.username}</p>
                  </div>
                  <Link
                    to={`/channel/${user.username}`}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    View Channel
                  </Link>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {user.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MdEmail className="text-purple-500 text-xl" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {user.createdAt && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MdCalendarToday className="text-purple-500 text-xl" />
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {user.coverImage && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 mb-2">Cover Image</p>
                      <img
                        src={user.coverImage}
                        alt="Cover"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={MdVideoLibrary}
            title="Total Videos"
            value={stats?.totalVideos || 0}
            color="text-blue-500"
            bgColor="bg-blue-500/20"
          />
          <StatCard
            icon={MdVisibility}
            title="Total Views"
            value={stats?.totalViews || 0}
            color="text-purple-500"
            bgColor="bg-purple-500/20"
          />
          <StatCard
            icon={MdThumbUp}
            title="Total Likes"
            value={stats?.totalLikes || 0}
            color="text-red-500"
            bgColor="bg-red-500/20"
          />
          <StatCard
            icon={MdPeople}
            title="Subscribers"
            value={stats?.totalSubscribers || 0}
            color="text-green-500"
            bgColor="bg-green-500/20"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Weekly Views</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#9333ea"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Engagement Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="views" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Videos Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Videos</h2>
            <div className="flex items-center gap-4">
              <select
                value={sortType}
                onChange={(e) => {
                  setSortType(e.target.value);
                  setPage(1);
                }}
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12">
              <MdVideoLibrary className="mx-auto text-6xl text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg mb-2">No videos yet</p>
              <p className="text-gray-500 text-sm">
                Start uploading videos to see them here
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page >= pagination.totalPages}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

