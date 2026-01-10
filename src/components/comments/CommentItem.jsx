function CommentItem({ comment }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-800">
      <img
        src={comment.owner.avatar}
        alt={comment.owner.username}
        className="w-9 h-9 rounded-full"
      />

      <div>
        <div className="text-sm text-gray-300">
          <span className="font-semibold text-white">
            {comment.owner.username}
          </span>
          <span className="ml-2 text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-white mt-1">{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentItem;
