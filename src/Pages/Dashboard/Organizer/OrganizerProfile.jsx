import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider'
import { EditOutlined } from '@ant-design/icons'

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext)

  return (
    <section className='relative shadow-xl m-16 p-2 rounded-lg'>
      <button>
        <EditOutlined className='top-0 right-0 absolute m-4 border-4 text-3xl' />
      </button>
      <div className='bg-white text-center'>
        <img
          className='shadow-lg mx-auto border-2 border-gray-300 rounded-full w-40 h-40 object-cover'
          src={user.photoURL}
          alt=''
        />
        <h1 className='mt-4 font-bold text-3xl'>{user?.displayName}</h1>
        <p className='font-semibold text-gray-500'>{user?.email}</p>
      </div>

      <div className='shadow-xl m-10 rounded-md'>
        <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>About</h1>
        <p className='p-4 text-gray-500 italic'>please write aboute yourself</p>
      </div>

      <div className='shadow-xl m-10 rounded-md'>
        <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>
          Personal Infomation
        </h1>

        <div>
          <p className='p-4 text-gray-500 italic'>
            please update your information !
          </p>
        </div>
      </div>

      <div className='shadow-xl m-10 rounded-md'>
        <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>Soial Link</h1>

        <div>
          <p className='p-4 text-gray-500 italic'>
            please update your information !
          </p>
        </div>
      </div>
    </section>
  )
}

export default OrganizerProfile
