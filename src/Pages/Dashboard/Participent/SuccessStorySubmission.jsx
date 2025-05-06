import { useContext, useState } from 'react'
import { Input, Button, message, Rate } from 'antd'
import axios from 'axios'
import { AuthContext } from '../../../Provider/AuthProvider'

const SuccessStorySubmission = () => {
  const { user } = useContext(AuthContext)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = async () => {
    if (!title || !story) {
      message.error('Title and Story are required!')
      return
    }

    const newStory = {
      participentName: user?.displayName,
      participentImg: user?.photoURL,
      rating: rating,
      title,
      story,
      image: image || 'https://via.placeholder.com/150', // Default image if none provided
      date: new Date().toISOString()
    }

    try {
      axios
        .post(
          'https://b10a12-server-side-developer-jaber.vercel.app/success-story',
          newStory
        )
        .then(() => {
          message.success('Success Story submitted!')
          setTitle('')
          setStory('')
          setImage('')
        })
        .catch(() => {
          message.error('Failed to submit the story!')
        })
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div className='p-8 min-h-screen'>
      <div className='bg-[#1A8A83] shadow-lg py-10 rounded-lg text-white text-center'>
        <h1 className='font-bold text-4xl'>Share Your Success Story</h1>
        <p className='mt-2 text-lg'>
          Your experience can inspire others to take action.
        </p>
      </div>

      <div className='bg-white shadow-md mx-auto mt-10 p-6 rounded-lg max-w-4xl'>
        <h2 className='mb-5 font-bold text-[#1A8A83] text-2xl text-center'>
          Submit Your Story
        </h2>

        <Input
          className='mb-4 p-2'
          placeholder='Story Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className='mb-4 p-3 border rounded-md w-full'
          placeholder='Write your success story here...'
          rows='6'
          value={story}
          onChange={e => setStory(e.target.value)}
        />

        <Input
          className='mb-4 p-2'
          placeholder='Image URL (Optional)'
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        <div className='my-4'>
          <Rate value={rating} onChange={setRating} />
        </div>

        <button
          type='primary'
          className='bg-[#42bb76] mt-4 p-1 rounded-md w-full font-bold text-gray-700 text-xl'
          onClick={handleSubmit}
        >
          Submit Story
        </button>
      </div>
    </div>
  )
}

export default SuccessStorySubmission
