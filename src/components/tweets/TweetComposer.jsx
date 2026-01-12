import { useState } from "react";
import { useCreateTweet } from "../../hooks/tweets/useCreateTweet";

function TweetComposer() {
  const [content, setContent] = useState("");
  const { mutate, isPending } = useCreateTweet();

  const submit = () => {
    if (!content.trim()) return;
    mutate({ content });
    setContent("");
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a tweet..."
        rows={3}
        className="w-full bg-gray-800 text-white p-3 rounded resize-none"
      />

      <div className="flex justify-end mt-2">
        <button
          onClick={submit}
          disabled={isPending}
          className="bg-purple-600 px-4 py-2 rounded text-sm"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default TweetComposer;
