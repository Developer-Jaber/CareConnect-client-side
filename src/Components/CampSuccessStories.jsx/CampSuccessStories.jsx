import { Card, Rate, Divider, message } from 'antd'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CampSuccessStories = () => {
  const [successStories, setSuccessStories] = useState([])
  // Mock Success Stories Data
  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/success-story')
      .then(response => response.json())
      .then(data => setSuccessStories(data))
  }, []);


  return (
    <div className='mt-24 min-h-screen'>
      <h1 className='mb-10 font-bold text-[#1A8A83] text-4xl text-center'>
        Camp Success Stories
      </h1>
      <div className='gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto w-10/12'>
        {successStories.map(story => (
          <motion.div
            key={story.id}
            className='flex justify-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={story.campName}
                  src={story.image}
                  className='rounded-t-lg'
                />
              }
              className='shadow-xl w-full max-w-md'
            >
              <h2 className='font-semibold text-blue-800 text-2xl'>
                {story.campName}
              </h2>
              <p className='flex items-center gap-3 text-gray-600'><img className='rounded-full w-10 h-10' src={story?.participentImg} alt="" /> <span className='font-semibold text-lg'>{story.participentName}</span></p>
              <Rate disabled defaultValue={story.rating} className='mt-2' />
              <div><span className='text-gray-400 text-sm'>{story.date}</span></div>
              <Divider />
              <p className='text-gray-700'>{story.story}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CampSuccessStories
