import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'
import useAxiosPublic from '../../Hook/useAxiosPublic'
import { message } from 'antd'

const JoinUs = () => {
  const { loginWithGoogle, loginUser, user,setLoder, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleLogin = data => {
    // Logic for email/password login
    loginUser(data.email, data.password)
      .then(result => {
        setUser(result)
        navigate(from, { replace: true })
      })
      .catch(error => {
        console.log(error)
      })
    console.log(data)
  }

  const handleSocialLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(()=>{
          message.success("successfully Login user!");
          navigate(from, { replace: true })
        })
        // .catch(()=>{
        //   message.error("Somthing went wrong!");
        // })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white shadow-xl p-6 rounded-lg w-full max-w-md card'>
        <h1 className='mb-4 font-bold text-2xl text-center'>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
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
            Login
          </button>
        </form>

        <div className='divider'>OR</div>
        <div className='space-y-2'>
          <button
            onClick={handleSocialLogin}
            className='flex items-center gap-2 w-full btn btn-outline'
          >
            <GoogleOutlined /> Login with Google
          </button>
          <button className='flex items-center gap-2 w-full btn btn-outline'>
            <GithubOutlined /> Login with GitHub
          </button>
          <button className='flex items-center gap-2 w-full btn btn-outline'>
            <FacebookOutlined /> Login with Facebook
          </button>
        </div>
        <p className='mt-4 text-center text-sm'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='text-blue-500 cursor-pointer'
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}

export default JoinUs
