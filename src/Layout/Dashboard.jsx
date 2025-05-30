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
      <div className='flex bg-[#FEF6FD] min-h-screen'>
        {/* Sidebar */}
        <aside className='bg-[#F6EEF5] mt-10 mb-10 ml-10 p-5 rounded-xl w-72 text-black'>
          {isOrganizer ? (
            <>
              <div>
                <NavLink
                  to='/dashboard/organizer-profile'
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-5 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 text-[var(--accent)]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>

                  {/* <FaUser className=''></FaUser> */}
                  <span className='font-semibold text-[1.1rem]'>
                    Organizer Profile
                  </span>
                </NavLink>
              </div>

              <nav>
                <NavLink
                  to='/dashboard/add-camp'
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 mt-10 px-4 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-7 text-[var(--accent)]'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z'
                      clipRule='evenodd'
                    />
                  </svg>

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
                  <MdManageHistory className='text-[1.5rem] text-[var(--accent)]'></MdManageHistory>
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
                  <MdManageHistory className='text-[1.5rem] text-[var(--accent)]'></MdManageHistory>
                  <span> Manage Registered Camps</span>
                </NavLink>
              </nav>
            </>
          ) : (
            <>
              <nav className='font-semiboldbold'>
                <NavLink
                  to='/dashboard/organizer-profile'
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-5 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 text-[var(--accent)]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>

                  {/* <FaUser className=''></FaUser> */}
                  <span className='font-semibold text-[1.1rem]'>
                    Participant Profile
                  </span>
                </NavLink>

                <NavLink
                  to='/dashboard/analytics'
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <IoAnalytics className='text-[1.5rem] text-[var(--accent)]'></IoAnalytics>
                  <span>Analytics</span>
                </NavLink>

                <NavLink
                  to='/dashboard/registered-camps'
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                      isActive ? 'bg-gray-500' : ''
                    }`
                  }
                >
                  <MdAppRegistration className='text-[1.5rem] text-[var(--accent)]'></MdAppRegistration>
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
                  <MdPayment className='text-[1.5rem] text-[var(--accent)]'></MdPayment>
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
                  <SnippetsOutlined className='text-[1.5rem] text-[var(--accent)]'></SnippetsOutlined>
                  <span>Write a Succes Story</span>
                </NavLink>
              </nav>
            </>
          )}

          <nav>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-500 ${
                  isActive ? 'bg-gray-500' : ''
                }`
              }
            >
              <FaHome className='text-[1.5rem] text-[var(--accent)]'></FaHome>
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
