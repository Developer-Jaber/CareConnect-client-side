import { Link } from 'react-router-dom'
import Logo from '../img/ConnectCareLogo.webp'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import { Button, message } from 'antd'

const Navber = () => {
  const { user, userLogOut } = useContext(AuthContext)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const link = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/available-camps-page'>Available Camps</Link>
      </li>
      <li>
        <Link to='/about-us'>About</Link>
      </li>
      <li>
        <Link to='/contact-us'>Contact</Link>
      </li>
      <li>
        <Link to='/blogs'>Blogs</Link>
      </li>
      <li className='md:hidden bg-[#2fbc2f] hover:bg-[#72f4aa] rounded-md font-semibold text-gray-200 hover:text-white text-start'>
        <Link to='/join-us'>Join Us</Link>
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
    <div
      className={`w-12/12 bg-[#fef6fd] md:px-10 lg:px-20 transition-all duration-300 navbar p-2  ${
        scrolled
          ? 'bg-[#b5f4de] shadow-md fixed top-0 left-0 z-50 py-2 lg:px-20'
          : 'bg-[#fef6fd]'
      }`}
    >
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='lg:hidden p-2 btn btn-ghost'>
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
            className='z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 font-semibold text-xl dropdown-content menu menu-sm'
          >
            {link}
          </ul>
        </div>
        <img className='rounded-lg w-7 md:w-14' src={Logo} alt='' />
        <a className='font-bold text-[#6be26b] text-[1.3rem] md:text-3xl btn btn-ghost'>
          CareConnect Camps
        </a>
      </div>
      <div className='hidden lg:flex font-semibold text-xl navbar-center'>
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
                <img
                  src={
                    user?.photoURL ||
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                  alt=''
                />
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
          <Link
            to='/join-us'
            className='hidden md:flex items-center bg-[#2fbc2f] hover:bg-[#72f4aa] text-[#090109] hover:text-white md:text-lg btn'
          >
            Join Us
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navber
