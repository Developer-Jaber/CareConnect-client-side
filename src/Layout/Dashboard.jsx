import { FaHome, FaUser } from 'react-icons/fa'
import { IoAnalytics } from 'react-icons/io5'
import {
  MdAddHome,
  MdAppRegistration,
  MdManageHistory,
  MdPayment
} from 'react-icons/md'
import { Outlet, NavLink } from 'react-router-dom'

const Dashboard = () => {
  const isOrganizer = true
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='bg-green-900 p-5 w-72 text-white'>
        {isOrganizer ? (
          <>
            <h2 className='mb-5 font-bold text-2xl'>Organizer Dashboard</h2>
            <nav>
              <NavLink
                to='/dashboard/'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <FaUser></FaUser>
                <span>Organizer Profile</span>
              </NavLink>
              <NavLink
                to='/dashboard/add-camp'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <MdAddHome></MdAddHome>
                <span>Add A Camp</span>
              </NavLink>
              <NavLink
                to='/dashboard/manage-camps'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <MdManageHistory></MdManageHistory>
                <span>Manage Camps</span>
              </NavLink>
              <NavLink
                to='/dashboard/manage-registered-camps'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <MdManageHistory></MdManageHistory>
                <span> Manage Registered Camps</span>
              </NavLink>
            </nav>
          </>
        ) : (
          <>
            <h2 className='mb-5 font-bold text-2xl'>Participant Dashboard</h2>
            <nav>
              <NavLink
                to='/dashboard/participant-profile'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <IoAnalytics></IoAnalytics>
                <span>Analytics</span>
              </NavLink>
              <NavLink
                to='/dashboard/add-camp'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <FaUser></FaUser>
                <span>Participant Profile</span>
              </NavLink>
              <NavLink
                to='/dashboard/manage-camps'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <MdAppRegistration></MdAppRegistration>
                <span>Registered Camps</span>
              </NavLink>
              <NavLink
                to='/dashboard/manage-registered-camps'
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                    isActive ? 'bg-gray-500' : ''
                  }`
                }
              >
                <MdPayment></MdPayment>
                <span>Payment History</span>
              </NavLink>
            </nav>
          </>
        )}
        <div className='divider divider-info'></div>
        <nav>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                isActive ? 'bg-gray-500' : ''
              }`
            }
          >
            <FaHome></FaHome>
            <span>Home</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 p-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
