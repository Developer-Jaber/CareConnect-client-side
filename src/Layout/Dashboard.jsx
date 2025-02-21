import { useContext, useEffect, useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { IoAnalytics } from 'react-icons/io5'
import {
  MdAddHome,
  MdAppRegistration,
  MdManageHistory,
  MdPayment
} from 'react-icons/md'
import { Outlet, NavLink } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider'
import Footer from '../Shared/Footer'
import { SnippetsOutlined } from '@ant-design/icons'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [isOrganizer, setIsOrganizer] = useState(false)

  // Fetch user role from backend
  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.email) {
        const res = await fetch(
          `https://b10a12-server-side-developer-jaber.vercel.app/users/${user.email}`
        )
        const data = await res.json()
        setIsOrganizer(data.role === 'organizer')
      }
    }
    checkUserRole()
  }, [user])

  return (
    <>
      <div className='flex min-h-screen'>
        {/* Sidebar */}
        <aside className='bg-[#b5f4de] p-5 w-72 text-black'>
          {isOrganizer ? (
            <>
              <div>
                <img className='shadow-lg mx-auto my-6 border-2 border-gray-300 rounded-full w-24 h-24 object-cover' src={user && user?.photoURL} alt="" />
                <h1 className='font-bold text-3xl text-center'>{user && user?.displayName}</h1>
                <p className='font-bold text-gray-500 text-center'>{user && user?.email}</p>
              </div>
              <div className='divider'></div>
              <nav>
                <NavLink
                  to='/dashboard/organizer-profile'
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
              <div>
                <img className='shadow-lg mx-auto my-6 border-2 border-gray-300 rounded-full w-24 h-24 object-cover' src={user && user?.photoURL} alt="" />
                <h1 className='my-1 font-bold text-3xl text-center'>{user && user?.displayName}</h1>
                <p className='font-bold text-gray-500 text-center'>{user && user?.email}</p>
              </div>
              <div className='divider'></div>
              <nav className='font-semiboldbold'>
                <NavLink
                  to='/dashboard/analytics'
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
                  to='/dashboard/prticipant-profile'
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
                  to='/dashboard/registered-camps'
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
                  to='/dashboard/pyment-history'
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <MdPayment></MdPayment>
                  <span>Payment History</span>
                </NavLink>
                <NavLink
                  to='/dashboard/success-story-submission'
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <SnippetsOutlined></SnippetsOutlined>
                  <span>Write a Succes Story</span>
                </NavLink>
              </nav>
            </>
          )}
          <div className='divider'></div>
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
      <Footer></Footer>
    </>
  )
}

export default Dashboard
