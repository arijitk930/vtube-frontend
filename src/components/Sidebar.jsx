// src/components/Sidebar.jsx
function Sidebar() {
  return (
    <aside className="w-60 border-r border-gray-800 p-4 hidden md:block">
      <nav className="space-y-4 text-gray-300">
        <p className="cursor-pointer hover:text-white">Home</p>
        <p className="cursor-pointer hover:text-white">Subscriptions</p>
        <p className="cursor-pointer hover:text-white">Library</p>
      </nav>
    </aside>
  );
}

export default Sidebar;
