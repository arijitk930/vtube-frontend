import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChannelStats } from "../hooks/dashboard/useChannelStats";
import { useDashboardVideos } from "../hooks/dashboard/useDashboardVideos";
import { useTogglePublishStatus } from "../hooks/videos/useTogglePublishStatus";
import { useDeleteVideo } from "../hooks/videos/useDeleteVideo";
import UploadVideoButton from "../components/channel/UploadVideoButton";
import UploadVideoModal from "../components/channel/UploadVideoModal";
import {
  MdVisibility,
  MdThumbUp,
  MdPeople,
  MdDelete,
  MdEdit,
} from "react-icons/md";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("desc");
  const limit = 10;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

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

  const { mutate: togglePublish, isPending: isToggling } =
    useTogglePublishStatus();
  const { mutate: deleteVideo, isPending: isDeleting } = useDeleteVideo();

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toLocaleString() || 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleTogglePublish = (videoId, currentStatus) => {
    togglePublish(videoId, {
      onSuccess: () => {
        // Query invalidation handled by hook
      },
      onError: (error) => {
        alert(error.message || "Failed to toggle publish status");
      },
    });
  };

  const handleDelete = (videoId, videoTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${videoTitle}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    deleteVideo(videoId, {
      onSuccess: () => {
        // Query invalidation handled by hook
      },
      onError: (error) => {
        alert(error.message || "Failed to delete video");
      },
    });
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    // You can navigate to edit page or open edit modal
    // For now, we'll just navigate to video detail page
    navigate(`/videos/${video._id}`);
  };

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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back, {user?.fullName || "User"}
            </h1>
            <p className="text-gray-400">
              Seamless Video Management, Elevated Results.
            </p>
          </div>
          <UploadVideoButton onClick={() => setIsUploadModalOpen(true)} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MdVisibility className="text-purple-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total views</p>
                <p className="text-white text-2xl font-bold">
                  {formatNumber(stats?.totalViews || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <MdPeople className="text-green-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total subscribers</p>
                <p className="text-white text-2xl font-bold">
                  {formatNumber(stats?.totalSubscribers || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <MdThumbUp className="text-red-500 text-2xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total likes</p>
                <p className="text-white text-2xl font-bold">
                  {formatNumber(stats?.totalLikes || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Uploaded
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Date uploaded
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <p className="text-gray-400 text-lg mb-2">No videos yet</p>
                      <p className="text-gray-500 text-sm">
                        Start uploading videos to see them here
                      </p>
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr
                      key={video._id}
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      {/* Toggle Switch */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleTogglePublish(video._id, video.isPublished)
                          }
                          disabled={isToggling}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${
                              video.isPublished
                                ? "bg-purple-600"
                                : "bg-gray-700"
                            }
                            ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                              ${
                                video.isPublished ? "translate-x-6" : "translate-x-1"
                              }
                            `}
                          />
                        </button>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`
                            inline-flex px-3 py-1 rounded-full text-xs font-medium
                            ${
                              video.isPublished
                                ? "bg-green-500/20 text-green-400"
                                : "bg-orange-500/20 text-orange-400"
                            }
                          `}
                        >
                          {video.isPublished ? "Published" : "Unpublished"}
                        </span>
                      </td>

                      {/* Video Thumbnail and Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-medium truncate">
                              {video.title}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rating (Likes) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MdThumbUp className="text-green-500 text-sm" />
                          <span className="text-green-400 text-sm">
                            {formatNumber(video.likes || 0)} likes
                          </span>
                        </div>
                      </td>

                      {/* Date Uploaded */}
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {formatDate(video.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(video)}
                            className="text-gray-400 hover:text-white transition p-1"
                            title="Edit video"
                          >
                            <MdEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(video._id, video.title)}
                            disabled={isDeleting}
                            className="text-gray-400 hover:text-red-500 transition p-1 disabled:opacity-50"
                            title="Delete video"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page >= pagination.totalPages}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Video Modal */}
      {isUploadModalOpen && (
        <UploadVideoModal
          onClose={() => setIsUploadModalOpen(false)}
          channelId={user?._id}
        />
      )}
    </div>
  );
}

export default Dashboard;
