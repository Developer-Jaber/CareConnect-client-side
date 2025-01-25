import { Outlet, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 p-5 w-64 text-white">
        <h2 className="mb-5 font-bold text-2xl">Organizer Dashboard</h2>
        <nav>
          <NavLink
            to="/dashboard/organizer-profile"
            className={({ isActive }) =>
              `block py-2 px-4 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Organizer Profile
          </NavLink>
          <NavLink
            to="/dashboard/add-camp"
            className={({ isActive }) =>
              `block py-2 px-4 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Add A Camp
          </NavLink>
          <NavLink
            to="/dashboard/manage-camps"
            className={({ isActive }) =>
              `block py-2 px-4 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Manage Camps
          </NavLink>
          <NavLink
            to="/dashboard/manage-registered-camps"
            className={({ isActive }) =>
              `block py-2 px-4 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Manage Registered Camps
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
