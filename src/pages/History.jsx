import { useHistory } from "../hooks/history/useHistory";
import HistoryList from "../components/history/HistoryList";

function History() {
  const { data, isPending, error } = useHistory();

  if (isPending) {
    return <div className="p-6 text-white">Loading history...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load history</div>;
  }

  const videos = data?.data || [];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>
      <HistoryList videos={videos} />
    </div>
  );
}

export default History;
