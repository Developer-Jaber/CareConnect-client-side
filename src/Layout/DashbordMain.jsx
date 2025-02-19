import Stack from '@mui/material/Stack'

import { BarChart } from '@mui/x-charts'
import { PieChart } from '@mui/x-charts'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

const DashbordMain = () => {
  const [highlightedItem, setHighLightedItem] = useState(null)
  const { user } = useContext(AuthContext)
  const [isOrganizer, setIsOrganizer] = useState(false)

  // Fetch user role from backend
  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.email) {
        const res = await fetch(
          `https://b10a12-server-side-developer-jaber.vercel.app/users/${user.email}`
        )
        const data = await res.json()
        setIsOrganizer(data.role === 'organizer')
      }
    }
    checkUserRole()
  }, [user])

  const barChartsProps = {
    series: [
      {
        data: [3, 4, 1, 6, 5],
        id: 'sync',
        highlightScope: { highlight: 'item', fade: 'global' }
      }
    ],
    xAxis: [{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }],
    height: 400,
    slotProps: {
      legend: {
        hidden: true
      }
    }
  }

  const pieChartProps = {
    series: [
      {
        id: 'sync',
        data: [
          { value: 3, label: 'A', id: 'A' },
          { value: 4, label: 'B', id: 'B' },
          { value: 1, label: 'C', id: 'C' },
          { value: 6, label: 'D', id: 'D' },
          { value: 5, label: 'E', id: 'E' }
        ],
        highlightScope: { highlight: 'item', fade: 'global' }
      }
    ],
    height: 400,
    slotProps: {
      legend: {
        hidden: true
      }
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center m-8'>
        <div>
          {isOrganizer ? (
            <h1 className='font-bold text-gray-700 text-2xl'>
              Organizer Dashboard
            </h1>
          ) : (
            <h1 className='font-bold text-gray-700 text-2xl'>
              Participant Dashboard
            </h1>
          )}
        </div>
        <label className='flex items-center gap-2 input-bordered input'>
          <input type='text' className='grow' placeholder='Search' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='opacity-70 w-4 h-4'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </div>
      <div className='flex justify-center items-center'>
        <Stack
          direction={{ xs: 'column', xl: 'row' }}
          spacing={1}
          sx={{ width: '80%' }}
          className='gap-16'
        >
          <BarChart
            {...barChartsProps}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
            className='shadow-md border-2'
          />
          
          <PieChart
            {...pieChartProps}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
            className='shadow-md pl-20 border-2'
          />
        </Stack>
      </div>
    </div>
  )
}

export default DashbordMain
