import { useState, useRef } from "react";
import Portal from "../ui/Portal";
import UploadProgressModal from "./UploadProgressModal";
import { usePublishVideo } from "../../hooks/videos/usePublishVideo";
import { useAuth } from "../../context/AuthContext";

function UploadVideoModal({ onClose, channelId }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const {
    mutate: publishVideo,
    isPending,
    cancel,
  } = usePublishVideo(channelId || user?._id);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    if (!videoFile || !thumbnailFile) {
      alert("Both video and thumbnail are required");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);

    // Show progress modal and start upload
    setShowProgressModal(true);
    setUploadProgress(0);
    setIsUploadComplete(false);

    publishVideo(
      {
        formData,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      },
      {
        onSuccess: () => {
          setIsUploadComplete(true);
          setUploadProgress(100);
        },
        onError: (error) => {
          setShowProgressModal(false);
          alert(error.message || "Failed to upload video");
        },
      }
    );
  };

  const handleCancelUpload = () => {
    cancel();
    setShowProgressModal(false);
    setUploadProgress(0);
    setIsUploadComplete(false);
  };

  const handleFinish = () => {
    // Clean up preview URLs
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    // Reset form
    setTitle("");
    setDescription("");
    setVideoFile(null);
    setThumbnailFile(null);
    setVideoPreview(null);
    setThumbnailPreview(null);
    setShowProgressModal(false);
    setUploadProgress(0);
    setIsUploadComplete(false);
    onClose();
  };

  const handleClose = () => {
    if (isPending) {
      // If upload is in progress, cancel it first
      handleCancelUpload();
    }
    // Clean up preview URLs
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    onClose();
  };

  return (
    <>
      {/* PROGRESS MODAL */}
      {showProgressModal && (
        <UploadProgressModal
          fileName={videoFile?.name || "Video"}
          fileSize={videoFile?.size || 0}
          progress={uploadProgress}
          onCancel={handleCancelUpload}
          onFinish={handleFinish}
          isComplete={isUploadComplete}
        />
      )}

      {/* UPLOAD FORM MODAL */}
      {!showProgressModal && (
        <Portal>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* MODAL */}
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6 m-4">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Upload Videos
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* VIDEO UPLOAD AREA */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="
                border-2 border-dashed border-gray-700
                rounded-lg
                p-12
                text-center
                hover:border-purple-600
                transition-colors
                cursor-pointer
              "
                  onClick={() => videoInputRef.current?.click()}
                >
                  {videoPreview ? (
                    <div className="space-y-4">
                      <video
                        src={videoPreview}
                        controls
                        className="max-w-full max-h-64 mx-auto rounded"
                      />
                      <p className="text-white text-sm">{videoFile?.name}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoFile(null);
                          setVideoPreview(null);
                          if (videoPreview) URL.revokeObjectURL(videoPreview);
                        }}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Remove video
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-white mb-2">
                        Drag and drop video files to upload
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        Your videos will be private until you publish them.
                      </p>
                      <button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
                      >
                        Select Files
                      </button>
                    </>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </div>

                {/* THUMBNAIL */}
                <div>
                  <label className="block text-white mb-2">
                    Thumbnail<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                    >
                      Choose File
                    </button>
                    <span className="text-gray-400 text-sm">
                      {thumbnailFile ? thumbnailFile.name : "No file chosen"}
                    </span>
                  </div>
                  {thumbnailPreview && (
                    <div className="mt-4">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="max-w-xs max-h-48 rounded object-cover"
                      />
                    </div>
                  )}
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </div>

                {/* TITLE */}
                <div>
                  <label className="block text-white mb-2">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-white mb-2">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                    placeholder="Enter video description"
                    required
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full text-sm font-medium transition"
                  >
                    {isPending ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default UploadVideoModal;
