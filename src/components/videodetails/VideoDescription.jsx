import { useState } from "react";

function VideoDescription({ description }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-4 mt-4">
      <p
        className={`text-sm text-gray-300 whitespace-pre-line ${
          !expanded ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </p>

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="text-sm text-blue-400 mt-2 hover:underline"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

export default VideoDescription;
