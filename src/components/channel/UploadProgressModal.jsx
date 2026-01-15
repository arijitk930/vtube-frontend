import Portal from "../ui/Portal";

function UploadProgressModal({
  fileName,
  fileSize,

  onCancel,
  onFinish,
  isComplete = false,
}) {
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Portal>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* MODAL */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 m-4">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Uploading Video...
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Track your video uploading process.
              </p>
            </div>
            {!isComplete && (
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-white transition text-xl"
              >
                ✕
              </button>
            )}
          </div>

          {/* FILE INFO */}
          <div className="bg-gray-800 rounded-lg p-4 mt-6 flex items-start gap-4">
            {/* VIDEO ICON */}
            <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* FILE DETAILS */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{fileName}</p>
              <p className="text-gray-400 text-sm mt-1">
                {formatFileSize(fileSize)}
              </p>

              {/* PROGRESS INDICATOR */}
              <div className="flex items-center gap-3 mt-4">
                {!isComplete ? (
                  <>
                    {/* SPINNING LOADER */}
                    <div className="relative w-6 h-6">
                      <div className="absolute inset-0 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-gray-400 text-sm">Uploading...</span>
                  </>
                ) : (
                  <>
                    {/* CHECKMARK */}
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-green-400 text-sm">
                      Upload complete!
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={onCancel}
              disabled={isComplete}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={onFinish}
              disabled={!isComplete}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default UploadProgressModal;
