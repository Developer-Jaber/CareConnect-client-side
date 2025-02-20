import { useContext, useEffect, useState } from 'react'
import {
  Table,
  Button,
  Tag,
  message,
  Modal,
  Input,
  Rate,
  Popconfirm
} from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { AuthContext } from '../../../Provider/AuthProvider'

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext)
  const [camps, setCamps] = useState([])
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false)
  const [selectedCamp, setSelectedCamp] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)

  // Mock API call to fetch camps
  useEffect(() => {
    fetch(
      `https://b10a12-server-side-developer-jaber.vercel.app/participants/email/${user?.email}`
    )
      .then(res => res.json())
      .then(data => setCamps(data))
  }, [])

  const handlePayment = async camp => {
    const trxID = Math.random().toString(36).substring(2) // Generate transaction ID
  
    try {
      // 🔥 Send a request to update payment status in the database
      const response = await fetch(`http://localhost:5000/participants/${camp._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: "Paid",
          trxID: trxID,
        }),
      })
  
      const result = await response.json()
  
      if (response.ok) {
        message.success(`Payment successful! Transaction ID: ${trxID}`)
  
        // 🔄 Update state to reflect new status in UI
        setCamps(prevCamps =>
          prevCamps.map(item =>
            item._id === camp._id ? { ...item, paymentStatus: "Paid", trxID } : item
          )
        )
      } else {
        throw new Error(result.message || "Failed to update payment status")
      }
    } catch (error) {
      message.error(`Payment failed: ${error.message}`)
    }
  }

  // Handle cancellation
  const handleCancelRegistration = async (id, isPaid, isConfirmed) => {
    if (isConfirmed || isPaid) {
      message.warning('You cannot cancel a confirmed or paid registration.')
      return
    }

    try {
      const response = await fetch(
        `https://b10a12-server-side-developer-jaber.vercel.app/cancel-registration/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (response.ok) {
        message.success('Registration canceled successfully.')
        // Update UI state to reflect changes
        setCamps(prevData => prevData.filter(item => item._id !== id))
      } else {
        message.error('Failed to cancel registration.')
      }
    } catch (error) {
      message.error('Something went wrong.')
    }
  }

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    message.success(
      `Feedback submitted: "${feedback}" with rating ${rating} stars`
    )
    setFeedback('')
    setRating(0)
    setFeedbackModalVisible(false)
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
      key: 'campFees'
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
      render: (text, record) => (
        <Tag color={text === 'Paid' ? 'green' : 'volcano'}>{text}</Tag>
      )
    },
    {
      title: 'Confirmation Status',
      dataIndex: 'confirmationStatus',
      key: 'confirmationStatus',
      render: text => (
        <Tag
          icon={
            text === 'Confirmed' ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          color={text === 'Confirmed' ? 'green' : 'orange'}
        >
          {text}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          {record.paymentStatus === 'Unpaid' ? (
            <Button type='primary' onClick={() => handlePayment(record)}>
              Pay
            </Button>
          ) : (
            <Button type='dashed' disabled>
              Paid
            </Button>
          )}

          {record.paymentStatus === 'Paid' &&
          record.confirmationStatus === 'Confirmed' ? (
            <Button
              type='default'
              onClick={() => {
                setSelectedCamp(record)
                setFeedbackModalVisible(true)
              }}
            >
              Feedback
            </Button>
          ) : (
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
              >
                Cancel
              </Button>
            </Popconfirm>
          )}
        </div>
      )
    }
  ]

  return (
    <div className='p-10 min-h-screen'>
      <h1 className='mb-10 font-bold text-[#1A8A83] text-3xl text-center'>
        Registered Camps
      </h1>
      <Table
        columns={columns}
        dataSource={camps}
        rowKey='id'
        className='bg-white shadow-xl rounded-lg'
      />

      {/* Feedback Modal */}
      <Modal
        title={`Feedback for ${selectedCamp?.campName}`}
        visible={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        onOk={handleFeedbackSubmit}
        okText='Submit'
      >
        <Input.TextArea
          placeholder='Enter your feedback'
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <div className='mt-4'>
          <Rate value={rating} onChange={setRating} />
        </div>
      </Modal>
    </div>
  )
}

export default RegisteredCamps
