// src/components/AppLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
