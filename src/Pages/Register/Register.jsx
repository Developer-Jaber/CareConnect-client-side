import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'
import { message } from 'antd'
import useAxiosPublic from '../../Hook/useAxiosPublic'

const Register = () => {
  const { createUser, updateUserprofile } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPublic = useAxiosPublic()

  const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const handleRegister = data => {
    createUser(data.email, data.password)
      .then(result => {
        updateUserprofile(data.displayName, data.photoURL)
          .then(() => {
            message.success('You have successfully Resistered!')
          })
          .catch(() => {
            message.error('Oops somthing went wrong!')
          })
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo).then(() => {
          navigate(from, { replace: true })
          reset()
        })
      })
      .catch(() => {
        message.error('Oops somthing went wrong!')
      })
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white shadow-xl p-6 rounded-lg w-full max-w-md card'>
        <h1 className='mb-4 font-bold text-2xl text-center'>Register</h1>
        <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
          {/* Input fild for PhotoUrl */}
          <div>
            <label className='block font-medium text-sm'>Name</label>
            <input
              type='displayName'
              {...register('displayName', { required: 'Name is required' })}
              className='input-bordered w-full input'
            />
            {errors.displayName && (
              <p className='mt-1 text-red-500 text-sm'>
                {errors.displayName.message}
              </p>
            )}
          </div>
          {/* Input fild for PhotoUrl */}
          <div>
            <label className='block font-medium text-sm'>photoURL</label>
            <input
              type='photoURL'
              {...register('photoURL', { required: 'PhotoURL is required' })}
              className='input-bordered w-full input'
            />
            {errors.photoURL && (
              <p className='mt-1 text-red-500 text-sm'>
                {errors.photoURL.message}
              </p>
            )}
          </div>
          {/* Input fild for email */}
          <div>
            <label className='block font-medium text-sm'>Email</label>
            <input
              type='email'
              {...register('email', { required: 'Email is required' })}
              className='input-bordered w-full input'
            />
            {errors.email && (
              <p className='mt-1 text-red-500 text-sm'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className='block font-medium text-sm'>Password</label>
            <input
              type='password'
              {...register('password', { required: 'Password is required' })}
              className='input-bordered w-full input'
            />
            {errors.password && (
              <p className='mt-1 text-red-500 text-sm'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button type='submit' className='w-full btn btn-primary'>
            Register
          </button>
        </form>
        <p className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/join-us')}
            className='text-blue-500 cursor-pointer'
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
