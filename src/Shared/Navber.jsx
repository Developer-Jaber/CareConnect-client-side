import { Link } from 'react-router-dom'
import Logo from '../img/ConnectCareLogo.webp'
import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import { Button, message } from 'antd'

const Navber = () => {
  const { user, userLogOut } = useContext(AuthContext)
  const link = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/available-camps-page'>Available Camps</Link>
      </li>
    </>
  )

  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        message.success('You have successfully Logged out!')
      })
      .catch(() => {
        message.error('Something went wrong!')
      })
  }
  return (
    <div className='bg-base-100 mx-auto w-10/12 navbar'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='lg:hidden btn btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm'
          >
            {link}
          </ul>
        </div>
        <img className='rounded-lg w-14' src={Logo} alt='' />
        <a className='font-bold text-[#1A8A83] text-2xl btn btn-ghost'>
          CareConnect Camps
        </a>
      </div>
      <div className='lg:flex hidden navbar-center'>
        <ul className='px-1 text-lg menu menu-horizontal'>{link}</ul>
      </div>
      <div className='navbar-end'>
        {user && user?.email ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost'
            >
              <div className='rounded-full w-10'>
                {user && user?.photoURL ? (
                  <img src={user.photoURL} alt='' />
                ) : (
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className='z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm'
            >
              <li className='bg-slate-300 p-3 overflow-hidden'>
                {user?.email}
              </li>
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li>
                <Button onClick={handleLogOut}>Logout</Button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/join-us' className='btn btn-primary'>
            Join Us
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navber
