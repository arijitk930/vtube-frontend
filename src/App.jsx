import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import LikedVideos from "./pages/LikedVideos";
import History from "./pages/History";
import Collections from "./pages/Collections";
import Subscribers from "./pages/Subscribers";
import Settings from "./pages/Settings";
import Channel from "./pages/Channel"; // ✅ ADD

import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT ROUTES */}
        <Route element={<AppLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/videos/:id" element={<VideoDetail />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/likedvideos" element={<LikedVideos />} />
            <Route path="/history" element={<History />} />

            {/* ✅ MY CONTENT → MY CHANNEL */}
            <Route path="/my-channel" element={<Channel />} />

            {/* ✅ ANY USER CHANNEL */}
            <Route path="/channel/:username" element={<Channel />} />

            <Route path="/collections" element={<Collections />} />
            <Route path="/subscribers" element={<Subscribers />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Auth only */}
        <Route path="/login" element={<Login />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
