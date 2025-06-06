import React, { useEffect, useState } from 'react'
import { Card, Button, Progress } from 'antd'
import { Link } from 'react-router-dom'
import './PopularCamps.css'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  UserOutlined
} from '@ant-design/icons'
import SectionTitle from '../../Shared/SectionTitle'

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
        <SectionTitle
        headline="Top-Rated Medical Camps"
        description="Explore the most popular medical camps trusted by the highest number of participants."
        ></SectionTitle>

        {/* Camp Cards */}
        <div className='gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {popularCamps.map(camp => (
            <Card
              key={camp._id}
              hoverable
              className='shadow-lg border-none rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 camp-card'
              cover={
                <img
                  alt={camp.name}
                  src={camp.image}
                  className='bg-[#D4EBD3] w-full h-48 md:h-56 object-cover'
                />
              }
              styles={{
                body: { padding: '16px 20px' }
              }}
            >
              <Meta
                title={
                  <h3 className='mb-2 font-bold text-[var(--text)] text-xl md:text-2xl line-clamp-1'>
                    {camp.name}
                  </h3>
                }
                description={
                  <div className='space-y-2 text-[1rem] text-[var(--text)]'>
                    {/* Highlight key info with icons */}
                    <div className='flex items-center gap-2'>
                      <CalendarOutlined className='text-[var(--accent)]' />
                      <span className='font-medium'>{camp.dateTime}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <EnvironmentOutlined className='text-[var(--accent)]' />
                      <span className='font-medium'>{camp.location}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <UserOutlined className='text-[var(--accent)]' />
                      <span className='font-medium'>{camp.professional}</span>
                    </div>

                    {/* Participant count with progress bar */}
                    <div className='mt-3'>
                      <div className='flex justify-between mb-1 text-sm'>
                        <span className='font-semibold'>Participants:</span>
                        <span className='font-bold text-[var(--primary)]'>
                          {camp.participants}
                        </span>
                      </div>
                      <Progress
                        percent={(camp.participants / 100) * 100} // Adjust max as needed
                        strokeColor='var(--primary)'
                        trailColor='var(--secondary)'
                        size='small'
                      />
                    </div>
                  </div>
                }
              />

              {/* CTA Button with hover effect */}
              <Link to={`/camp-details/${camp._id}`}>
                <button className='flex justify-center items-center gap-2 bg-[#2fbc2f] hover:bg-[#b8c7bf] mt-4 py-3 rounded-lg w-full font-bold text-[#090109] transition-all duration-300'>
                  View Details
                </button>
              </Link>
            </Card>
          ))}
        </div>

        {/* See All Camps Button */}
        <div className='mt-10 text-center'>
          <Link
            to='/available-camps-page'
            className='bg-[var(--secondary)] hover:bg-[#b8c7bf] mt-6 border-none text-[#090109] md:text-xl btn btn-primary'
          >
           See All Camps
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularCamps
