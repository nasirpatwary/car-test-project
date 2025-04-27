import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { DashboardLeftSite } from "../DashboarCustom/DashboarCustom";
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-60 bg-gray-800 text-white p-4 transform transition-transform duration-700 lg:relative lg:translate-x-0 lg:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold hidden lg:block">
            {user?.displayName}
          </h2>
          <img
            className="w-8 h-8 rounded-full mx-auto shadow-lg shadow-cyan-500/50 bg-cyan-500 scale-125 ring-2 ring-cyan-500 animate-pulse"
            src={user?.photoURL}
            alt=""
          />
        </div>
        <div className="divider">Our Menu</div>
        <DashboardLeftSite />
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-2 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="text-gray-800" />
          </button>
          <h1 className="text-lg font-semibold text-black">{user?.displayName}</h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Content area */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {children}
          </main>

          {/* Right menu (Collections) - visible only on xl+ */}
          <aside className="w-72 bg-white border-l text-black p-4 hidden xl:block">
            <h3 className="text-lg font-semibold mb-4">Collections</h3>
            <ul className="space-y-3">
              <li className="bg-gray-100 p-2 rounded">Saved Item 1</li>
              <li className="bg-gray-100 p-2 rounded">Saved Item 2</li>
              <li className="bg-gray-100 p-2 rounded">Saved Item 3</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
