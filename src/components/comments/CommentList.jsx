import CommentItem from "./CommentItem";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No comments yet. Be the first!
      </p>
    );
  }

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
