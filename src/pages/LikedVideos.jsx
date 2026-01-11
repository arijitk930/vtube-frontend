import { useLikedVideos } from "../hooks/likes/useLikedVideos";
import LikedVideosList from "../components/likes/LikedVideoList";

function LikedVideos() {
  const { data, isPending, error } = useLikedVideos();

  if (isPending) {
    return <div className="p-6 text-white">Loading liked videos...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load liked videos</div>;
  }

  // 👇 unwrap `video` from backend response
  const videos = data?.data?.map((item) => item.video) || [];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>
      <LikedVideosList videos={videos} />
    </div>
  );
}

export default LikedVideos;
