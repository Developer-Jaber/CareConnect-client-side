import { Card, Avatar, Rate, Tag, Row, Col, Button } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  StarFilled,
  CalendarOutlined,
  MessageOutlined
} from '@ant-design/icons'
import SectionTitle from '../../Shared/SectionTitle'

const ProfessionalsSection = () => {
  const professionals = [
    {
      id: 1,
      name: 'Dr. Ayesha Rahman',
      specialization: 'Cardiologist',
      photo: 'https://i.ibb.co/7NdBffcK/image.png', 
      campsLed: 42,
      rating: 4.9,
      tags: ['Heart Health', 'ECG Expert']
    },
    {
        id: 1,
        name: 'Dr. Ayesha Rahman',
        specialization: 'Cardiologist',
        photo: 'https://i.ibb.co/7NdBffcK/image.png', 
        campsLed: 42,
        rating: 4.9,
        tags: ['Heart Health', 'ECG Expert']
      },
      {
        id: 1,
        name: 'Dr. Ayesha Rahman',
        specialization: 'Cardiologist',
        photo: 'https://i.ibb.co/7NdBffcK/image.png', 
        campsLed: 42,
        rating: 4.9,
        tags: ['Heart Health', 'ECG Expert']
      }

   
  ]

  return (
    <div className='bg-[var(--background)] p-6 md:p-12'>
      
    <SectionTitle
    headline="Meet Our Specialists"
    description="Connect with our experienced medical professionals who lead our camps and provide expert care."
    ></SectionTitle>

      <Row gutter={[24, 24]} justify='center'>
        {professionals.map(doc => (
          <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
            <div className='flex flex-col bg-white shadow-md hover:shadow-xl border border-[var(--secondary)] rounded-xl h-full overflow-hidden transition-all duration-300'>
              {/* Header with photo */}
              <div className='relative h-48 overflow-hidden'>
                <img
                  alt={doc.name}
                  src={doc.photo}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                />
                <div className='right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/70 to-transparent p-4'>
                  <div className='flex justify-between items-end'>
                    <Tag className='bg-[var(--accent)] border-none text-white'>
                      {doc.specialization}
                    </Tag>
                    <div className='flex items-center text-white'>
                      <MedicineBoxOutlined className='mr-1' />
                      <span>{doc.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body content */}
              <div className='flex-grow p-6'>
                <h3 className='mb-1 font-bold text-[var(--text)] text-xl'>
                  {doc.name}
                </h3>

                <div className='flex items-center mb-3'>
                  <div className='flex mr-4'>
                    {[...Array(5)].map((_, i) => (
                      <StarFilled
                        key={i}
                        className={`text-${
                          i < Math.floor(doc.rating)
                            ? '[var(--accent)]'
                            : '[var(--secondary)]'
                        } text-sm`}
                      />
                    ))}
                  </div>
                  <span className='text-gray-600 text-sm'>{doc.rating}</span>
                </div>

                <div className='space-y-2 mb-4'>
                  <div className='flex items-center'>
                    <CalendarOutlined className='mr-2 text-[var(--primary)]' />
                    <span className='text-sm'>
                      Led <strong>{doc.campsLed}</strong> camps
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <MessageOutlined className='mr-2 text-[var(--primary)]' />
                    <span className='text-sm'>
                      Next available: <strong>{doc.nextAvailable}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className='px-6 pb-6'>
                <Button
                  block
                  className='bg-[var(--primary)] hover:bg-[var(--accent)] h-10 font-medium text-[var(--text)]'
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className='mt-16 text-center'>
        <Button
          size='large'
          className='bg-[var(--secondary)] hover:bg-[var(--accent)] px-8 h-12 text-[var(--text)]'
        >
          View All Specialists
        </Button>
      </div>
    </div>
  )
}

export default ProfessionalsSection
