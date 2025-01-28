import { useEffect, useState } from 'react'
import { Table, Button, Space, Typography, Tag, message, Popconfirm } from 'antd'

const { Title } = Typography

const ManageRegisteredCamps = () => {
  const [registeredCamps, setRegisteredCamps] = useState([])

  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/participants')
      .then((response) => response.json())
      .then((data) => setRegisteredCamps(data))
  }, [])

  const handleConfirmPayment = (campId) => {
    fetch(`https://b10a12-server-side-developer-jaber.vercel.app/confirm-payment/${campId}`, {
      method: 'PATCH'
    }).then(() => {
      setRegisteredCamps((prevCamps) =>
        prevCamps.map((camp) =>
          camp._id === campId ? { ...camp, confirmationStatus: 'Confirmed' } : camp
        )
      )
      message.success('Payment confirmed successfully!')
    })
  }

  const handleCancelRegistration = (campId, isPaid, isConfirmed) => {
    if (isPaid && isConfirmed) {
      message.error('Cannot cancel a confirmed and paid registration.')
      return
    }
    fetch(`https://b10a12-server-side-developer-jaber.vercel.app/cancel-registration/${campId}`, {
      method: 'DELETE'
    }).then(() => {
      setRegisteredCamps((prevCamps) =>
        prevCamps.filter((camp) => camp._id !== campId)
      )
      message.success('Registration canceled successfully!')
    })
  }

  const columns = [
    {
      title: 'Camp Name',
      dataIndex: 'campName',
      key: 'campName'
    },
    {
      title: 'Camp Fees',
      dataIndex: 'campFees',
      key: 'campFees',
      render: (fees) => `${fees}`
    },
    {
      title: 'Participant Name',
      dataIndex: 'participantName',
      key: 'participantName'
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <Tag color={status === 'Paid' ? 'green' : 'volcano'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Confirmation Status',
      dataIndex: 'confirmationStatus',
      key: 'confirmationStatus',
      render: (status, record) => (
        <Button
          type={status === 'Confirmed' ? 'default' : 'primary'}
          disabled={status === 'Confirmed'}
          onClick={() => handleConfirmPayment(record._id)}
        >
          {status}
        </Button>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title='Are you sure to cancel this registration?'
            onConfirm={() =>
              handleCancelRegistration(
                record._id,
                record.paymentStatus === 'Paid',
                record.confirmationStatus === 'Confirmed'
              )
            }
            okText='Yes'
            cancelText='No'
          >
            <Button
              type='danger'
              disabled={record.paymentStatus === 'Paid' && record.confirmationStatus === 'Confirmed'}
            >
              Cancel
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className='bg-base-200 p-5'>
      <Title level={3} className='mb-5 text-center'>
        Manage Registered Camps
      </Title>
      <Table
        columns={columns}
        dataSource={registeredCamps.map((camp) => ({ ...camp, key: camp._id }))}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}

export default ManageRegisteredCamps
