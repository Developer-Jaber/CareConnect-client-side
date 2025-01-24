import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'

const Register = () => {
  const { createUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleRegister = data => {
    createUser(data.email,data.password)
      .then(result => {
        console.log(result.user)
        navigate('/') // Redirect to home after registration
      })
      .catch(error => console.error(error))
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white shadow-xl p-6 rounded-lg w-full max-w-md card'>
        <h1 className='mb-4 font-bold text-2xl text-center'>Register</h1>
        <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
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
