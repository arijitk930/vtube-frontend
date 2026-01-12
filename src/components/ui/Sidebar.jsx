import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  AiFillHome,
  AiOutlineLike,
  AiOutlineHistory,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdVideoLibrary, MdSubscriptions, MdHelpOutline } from "react-icons/md";

function Sidebar() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded hover:text-white hover:bg-gray-800";

  return (
    <aside className="w-60 border-r border-gray-800 p-4 hidden md:block">
      <nav className="space-y-2 text-gray-300">
        {/* ALWAYS VISIBLE */}
        <NavLink to="/" className={linkClass}>
          <AiFillHome size={20} />
          <span>Home</span>
        </NavLink>

        {/* GUEST CTA */}
        {!token && (
          <div className="mt-6 border-t border-gray-800 pt-4 space-y-3">
            <p className="text-sm text-gray-400">
              Sign in to like videos, view history and manage your content.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-200"
            >
              Sign In
            </button>
          </div>
        )}

        {/* LOGGED-IN ONLY */}
        {token && (
          <>
            <NavLink to="/likedvideos" className={linkClass}>
              <AiOutlineLike size={20} />
              <span>Liked Videos</span>
            </NavLink>

            <NavLink to="/history" className={linkClass}>
              <AiOutlineHistory size={20} />
              <span>History</span>
            </NavLink>

            <NavLink to="/my-channel" className={linkClass}>
              <MdVideoLibrary size={20} />
              <span>My Channel</span>
            </NavLink>

            {/*  <NavLink to="/collections" className={linkClass}>
              <MdSubscriptions size={20} />
              <span>Collections</span>
            </NavLink> */}

            <NavLink to="/settings" className={linkClass}>
              <AiOutlineSetting size={20} />
              <span>Settings</span>
            </NavLink>
          </>
        )}

        <NavLink to="/support" className={linkClass}>
          <MdHelpOutline size={20} />
          <span>Support</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
