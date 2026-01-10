import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass =
    "block px-3 py-2 rounded hover:text-white hover:bg-gray-800";

  return (
    <aside className="w-60 border-r border-gray-800 p-4 hidden md:block">
      <nav className="space-y-2 text-gray-300">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/liked" className={linkClass}>
          Liked Videos
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          History
        </NavLink>

        <NavLink to="/my-content" className={linkClass}>
          My Content
        </NavLink>

        <NavLink to="/collections" className={linkClass}>
          Collections
        </NavLink>

        <NavLink to="/subscribers" className={linkClass}>
          Subscribers
        </NavLink>

        <NavLink to="/support" className={linkClass}>
          Support
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
