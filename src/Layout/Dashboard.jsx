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
                    `flex items-center gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
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
                  to='/dashboard'
                  className={({ isActive }) =>
                    `flex items-center gap-3 mt-16 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="26"  height="26"  viewBox="0 0 24 24"  fill="currentColor"  class="icon-tabler icon-tabler-chart-donut icons-tabler-filled text-[var(--accent)] icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.292 2.61c.396 .318 .65 .78 .703 1.286l.005 .104v4a1 1 0 0 1 -.748 .968a3.1 3.1 0 1 0 3.78 3.78a1 1 0 0 1 .968 -.748h3.8a2 2 0 0 1 2 2a1 1 0 0 1 -.026 .226a10 10 0 1 1 -12 -12l.057 -.01l.052 -.01a1.9 1.9 0 0 1 1.409 .404m3.703 -.11l.045 .002l.067 .004l.081 .014l.032 .004l.072 .022l.04 .01a10 10 0 0 1 6.003 5.818l.108 .294a1 1 0 0 1 -.943 1.332h-4.5a1 1 0 0 1 -.76 -.35a8 8 0 0 0 -.89 -.89a1 1 0 0 1 -.35 -.76v-4.5q .001 -.119 .026 -.23l.03 -.102a1 1 0 0 1 .168 -.299l.03 -.033l.039 -.043a1 1 0 0 1 .089 -.08l.051 -.034l.03 -.023l.045 -.025l.052 -.03a1 1 0 0 1 .435 -.101" /></svg>

                  <span className='font-semibold text-[1rem]'>Overview</span>
                </NavLink>

                <NavLink
                  to='/dashboard/add-camp'
                  className={({ isActive }) =>
                    `flex items-center gap-3 mt-4 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
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

                  <span className='font-semibold text-[1rem]'>Add A Camp</span>
                </NavLink>
                <NavLink
                  to='/dashboard/manage-camps'
                  className={({ isActive }) =>
                    `flex items-center gap-3 mt-4 py-3 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='icon-tabler icon-tabler-settings-pin icons-tabler-outline text-[1.5rem] text-[var(--accent)] icon'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M12.578 20.905c-.88 .299 -1.983 -.109 -2.253 -1.222a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.574 .14 .96 .5 1.16 .937' />
                    <path d='M14.99 12.256a3 3 0 1 0 -2.33 2.671' />
                    <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
                    <path d='M19 18v.01' />
                  </svg>
                  <span className='font-semibold text-[1rem]'>
                    Manage Camps
                  </span>
                </NavLink>
                <NavLink
                  to='/dashboard/manage-registered-camps'
                  className={({ isActive }) =>
                    `flex items-center gap-3 mt-4 py-1 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <MdManageHistory className='text-[1.8rem] text-[var(--accent)]'></MdManageHistory>
                  <span className='font-semibold text-[1rem]'>
                    {' '}
                    Manage Registered Camps
                  </span>
                </NavLink>
              </nav>
            </>
          ) : (
            <>
              <nav className='font-semiboldbold'>
                <NavLink
                  to='/dashboard/organizer-profile'
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
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
                    `flex items-center mt-16 gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <IoAnalytics className='text-[1.5rem] text-[var(--accent)]'></IoAnalytics>
                  <span className='font-semibold text-[1rem]'>Analytics</span>
                </NavLink>

                <NavLink
                  to='/dashboard/registered-camps'
                  className={({ isActive }) =>
                    `flex items-center mt-4 gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <MdAppRegistration className='text-[1.5rem] text-[var(--accent)]'></MdAppRegistration>
                  <span className='font-semibold text-[1rem]'>
                    Registered Camps
                  </span>
                </NavLink>
                <NavLink
                  to='/dashboard/pyment-history'
                  className={({ isActive }) =>
                    `flex items-center mt-4 gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <MdPayment className='text-[1.5rem] text-[var(--accent)]'></MdPayment>
                  <span className='font-semibold text-[1rem]'>
                    Payment History
                  </span>
                </NavLink>
                <NavLink
                  to='/dashboard/success-story-submission'
                  className={({ isActive }) =>
                    `flex items-center mt-4 gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                      isActive ? 'bg-[var(--secondary)]' : ''
                    }`
                  }
                >
                  <SnippetsOutlined className='text-[1.5rem] text-[var(--accent)]'></SnippetsOutlined>
                  <span className='font-semibold text-[1rem]'>
                    Write a Succes Story
                  </span>
                </NavLink>
              </nav>
            </>
          )}

          <nav>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `flex items-center mt-10 gap-3 py-2 px-5 rounded-3xl hover:bg-[var(--secondary)] ${
                  isActive ? 'bg-[var(--secondary)]' : ''
                }`
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='icon-tabler icon-tabler-home-up icons-tabler-outline text-[1.5rem] text-[var(--accent)] icon'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M9 21v-6a2 2 0 0 1 2 -2h2c.641 0 1.212 .302 1.578 .771' />
                <path d='M20.136 11.136l-8.136 -8.136l-9 9h2v7a2 2 0 0 0 2 2h6.344' />
                <path d='M19 22v-6' />
                <path d='M22 19l-3 -3l-3 3' />
              </svg>
              <span className='font-semibold text-[1rem]'>Home</span>
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
