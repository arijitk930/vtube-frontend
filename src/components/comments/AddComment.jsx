import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../../api/fetcher";
import { useAuth } from "../../context/AuthContext";

function AddComment({ videoId }) {
  const [content, setContent] = useState("");
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      fetcher(`/comments/${videoId}`, {
        method: "POST",
        token,
        body: { content },
      }),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries(["comments", videoId]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    mutate();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="w-full bg-black border border-gray-700 rounded p-2 text-white resize-none"
        rows={2}
      />

      <div className="flex justify-end mt-2">
        <button
          disabled={isPending}
          className="px-4 py-1 bg-blue-600 rounded text-sm disabled:opacity-50"
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default AddComment;
