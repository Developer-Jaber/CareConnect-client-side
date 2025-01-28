import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Space, Typography, message } from 'antd'

const { Title } = Typography

const ManageCamps = () => {
  const [camps, setCamps] = useState([])

  // Fetch camps on component load
  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/madical_camp')
      .then((response) => response.json())
      .then((data) => setCamps(data))
  }, [])

  // Handle Delete Function
  const handleDelete = (campId) => {
    if (window.confirm('Are you sure you want to delete this camp?')) {
      fetch(`https://b10a12-server-side-developer-jaber.vercel.app/delete-camp/${campId}`, {
        method: 'DELETE'
      }).then(() => {
        setCamps((prevCamps) => prevCamps.filter((camp) => camp._id !== campId))
        message.success('Camp deleted successfully!')
      })
    }
  }

  const columns = [
    {
      title: 'Camp Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Healthcare Professional',
      dataIndex: 'healthcareProfessional',
      key: 'healthcareProfessional'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Link to={`/dashboard/update-camp/${record._id}`}>
            <Button type='primary' size='small'>
              Update
            </Button>
          </Link>
          <Button type='danger' size='small' onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div className='bg-base-200 p-5'>
      <Title level={3} className='mb-5 text-center'>
        Manage Camps
      </Title>
      <Table
        columns={columns}
        dataSource={camps.map((camp) => ({ ...camp, key: camp._id }))}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}

export default ManageCamps
