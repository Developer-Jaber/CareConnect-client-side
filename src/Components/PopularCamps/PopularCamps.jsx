import React, { useEffect, useState } from 'react'
import { Card, Button } from 'antd'
import { Link } from 'react-router-dom'
import './PopularCamps.css'

const { Meta } = Card

const PopularCamps = () => {
  const [camps, setCamps] = useState([])

  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/madical_camp')
      .then(res => res.json())
      .then(data => setCamps(data))
  }, [])

  // Limit to a maximum of six camps sorted by participant count
  const popularCamps = camps
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6)

  return (
    <div className='mx-auto py-12 w-11/12 popular-camps-section'>
      <div className='mx-auto px-1 sm:px-14 container'>
        {/* Section Title */}
        <div className='mb-10 md:mb-24 text-center'>
          <h2 className='font-bold text-[#1A8A83] text-3xl md:text-4xl lg:text-5xl'>
            Top-Rated Medical Camps
          </h2>
          <p className='mt-4 text-lg md:text-xl'>
            Explore the most popular medical camps trusted by the highest number
            of participants.
          </p>
        </div>

        {/* Camp Cards */}
        <div className='gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {popularCamps.map(camp => (
            <Card
              key={camp._id}
              hoverable
              className='shadow-lg rounded-lg camp-card'
              cover={
                <img
                  alt={camp.name}
                  src={camp.image}
                  className='rounded-t-lg w-full h-56 object-cover'
                />
              }
            >
              <Meta
                title={
                  <h3 className='my-3 font-bold text-blue-800 text-lg md:text-xl'>
                    {camp.name}
                  </h3>
                }
                description={
                  <div className='mt-2 md:text-sm'>
                    <p className='font-bold'>
                      <span className='text-black md:text-lg'>Date & Time: </span>{' '}
                      {camp.dateTime}
                    </p>
                    <p className='font-bold'>
                      <span className='text-black md:text-lg'>Location: </span>{' '}
                      {camp.location}
                    </p>
                    <p className='font-bold'>
                      <span className='text-black md:text-lg'>Professional: </span>{' '}
                      {camp.professional}
                    </p>
                    <p className='font-bold'>
                      <span className='text-black md:text-lg'>Participants: </span>{' '}
                      {camp.participants}
                    </p>
                  </div>
                }
              />
              <Link to={`/camp-details/${camp._id}`}>
                <button className='bg-[#42bb76] hover:bg-[#b8c7bf] mt-6 border-none md:w-full font-bold text-gray-200 hover:text-gray-600 md:text-lg btn'>
                  View Details
                </button>
              </Link>
            </Card>
          ))}
        </div>

        {/* See All Camps Button */}
        <div className='mt-10 text-center'>
          <Link to='/available-camps-page'>
            <button className='bg-[#42bb76] hover:bg-[#b8c7bf] md:mt-10 px-6 rounded-lg font-semibold text-gray-200 hover:text-gray-600 md:text-xl btn'>
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularCamps
