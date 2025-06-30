import { QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons'
import SectionTitle from '../../Shared/SectionTitle'
import { useEffect, useState } from 'react'

import {
  Collapse,
  Tag,
  Divider,
  Button,
  Modal,
  Input,
  Spin,
  Avatar,
  List
} from 'antd'
import {

  RobotOutlined,
  UserOutlined,
  SendOutlined
} from '@ant-design/icons'

const { Panel } = Collapse

const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I join a medical camp?',
      answer:
        "Register through our website by selecting a camp and filling out the participant form. You'll receive a confirmation email with details.",
      category: 'Participation'
    },
    {
      question: 'Is participation free?',
      answer:
        'Most camps are free, but some specialized screenings may have nominal fees. Always check the camp details page for pricing.',
      category: 'Cost'
    },
    {
      question: 'Can I organize a camp with your team?',
      answer:
        'Absolutely! Contact our partnerships team with your proposed location, date, and target services. We provide logistical support and medical staff coordination.',
      category: 'Organization'
    },
    {
      question: 'What should I bring to the camp?',
      answer:
        'Please bring your ID, any existing medical reports, and a list of current medications. Wear comfortable clothing for easy examination.',
      category: 'Preparation'
    },
    {
      question: 'How are volunteers selected?',
      answer:
        'Volunteers undergo background checks and orientation training. Medical professionals must provide credentials.',
      category: 'Volunteering'
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  //const [apiKey] = useState(process.env.REACT_APP_OPENROUTER_API_KEY)
  const [apiKey] = useState(
    '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'
  )

  

  const showModal = () => {
    setIsModalOpen(true)
    // Initialize with a welcome message
    setMessages([
      {
        role: 'ai',
        content:
          "Hello! I'm your Medical Camp Assistant. How can I help you today?"
      }
    ])
  }

  const handleOk = () => {
    setIsModalOpen(false)
    setMessages([])
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setMessages([])
  }

  // const handleSend = async () => {
  //   if (!input.trim()) return

  //   // Add user message to chat
  //   const userMessage = { role: 'user', content: input }
  //   setMessages(prev => [...prev, userMessage])
  //   setInput('')
  //   setLoading(true)

  //   try {
  //     const response = await fetch(
  //       'https://openrouter.ai/api/v1/chat/completions',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${apiKey}`,
  //           'HTTP-Referer': window.location.href,
  //           'X-Title': 'Medical Camp System',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           'model': 'deepseek/deepseek-r1:free',
  //           'messages': [
  //             {
  //               'role': 'system',
  //               'content':
  //                 'You are a medical camp assistant. Provide accurate information about camp participation, organization, and healthcare services. Keep responses concise and helpful.'
  //             },
  //             ...messages.map(msg => ({
  //               role: msg.role === 'user' ? 'user' : 'assistant',
  //               content: msg.content
  //             })),
  //             {
  //               'role': 'user',
  //               'content': input
  //             }
  //           ]
  //         })
  //       }
  //     );

  //     if (!response.ok) {
  //     throw new Error(`API request failed with status ${response.status}`);
  //   }

  //     const data = await response.json()
  //     // Improved response handling
  //   if (!data.choices || !data.choices[0] || !data.choices[0].message) {
  //     throw new Error('Invalid API response structure');
  //   }

  //     const aiMessage = { 
  //     role: 'ai', 
  //     content: data.choices[0].message.content 
  //   };
  //     setMessages(prev => [...prev, aiMessage])
  //   } catch (error) {
  //     console.error('AI Error:', error)
  //     setMessages(prev => [
  //       ...prev,
  //       {
  //         role: 'ai',
  //         content: `Sorry, I encountered an error: ${error.message}. Please try again later.`
  //       }
  //     ]);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  const handleSend = async () => {
  if (!input.trim()) return

  // Add user message to chat
  const userMessage = { role: 'user', content: input }
  const updatedMessages = [...messages, userMessage] // Create new array with new message
  setMessages(updatedMessages)
  setInput('')
  setLoading(true)

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Medical Camp System',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'model': 'deepseek/deepseek-r1:free',
          'messages': [
            {
              'role': 'system',
              'content':
                'You are a medical camp assistant. Provide accurate information about camp participation, organization, and healthcare services. Keep responses concise and helpful.'
            },
            ...updatedMessages.map(msg => ({
              role: msg.role === 'user' ? 'user' : 'assistant',
              content: msg.content
            }))
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json()
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid API response structure');
    }

    const aiMessage = { 
      role: 'ai', 
      content: data.choices[0].message.content 
    };
    setMessages(prev => [...prev, aiMessage])
  } catch (error) {
    console.error('AI Error:', error)
    setMessages(prev => [
      ...prev,
      {
        role: 'ai',
        content: `Sorry, I encountered an error: ${error.message}. Please try again later.`
      }
    ]);
  } finally {
    setLoading(false)
  }
};
  return (
    <div className='bg-[var(--background)] p-8 md:p-12 lg:p-16'>
      {/*Section title */}
      <SectionTitle
        headline='Frequently Asked Questions'
        description='Quick answers to common questions about our medical camps'
      ></SectionTitle>

      <div className='mx-auto max-w-4xl'>
        <Collapse
          accordion
          bordered={false}
          expandIconPosition='end'
          className='bg-transparent'
          expandIcon={({ isActive }) => (
            <div
              className={`p-1 rounded-full ${
                isActive
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--secondary)]'
              }`}
            >
              <QuestionCircleOutlined />
            </div>
          )}
        >
          {faqs.map((faq, index) => (
            <Panel
              key={index}
              header={
                <div className='font-medium text-[var(--text)] text-2xl'>
                  {faq.question}
                </div>
              }
              extra={
                <Tag className='bg-[var(--secondary)] p-2 text-lg'>
                  {faq.category}
                </Tag>
              }
              className='bg-white shadow-sm hover:shadow-md mb-4 border-0 rounded-lg transition-all'
            >
              <Divider className='bg-[var(--secondary)] my-3' />
              <p className='text-gray-700'>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>

        <div className='mt-12 text-center'>
          <p className='mb-6 text-[var(--text)]'>Didn't find your answer?</p>
          <button
            onClick={showModal}
            size='large'
            className='bg-[#2fbc2f] hover:bg-[#b8c7bf] mt-2 mr-5 border-none text-[#090109] md:text-xl btn btn-primary'
          >
            <MessageOutlined />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
      {/* AI Chat Modal */}
      <Modal
        title={
          <div className='flex items-center gap-2'>
            <Avatar
              icon={<RobotOutlined />}
              style={{ backgroundColor: '#1A8A83' }}
            />
            <span>Medical Camp AI Assistant</span>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <div className='mb-4 p-4 border rounded-lg h-[400px] overflow-y-auto'>
          <List
            dataSource={messages}
            renderItem={(msg, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={
                        msg.role === 'user' ? (
                          <UserOutlined />
                        ) : (
                          <RobotOutlined />
                        )
                      }
                    />
                  }
                  title={msg.role === 'user' ? 'You' : 'AI Assistant'}
                  description={msg.content}
                />
              </List.Item>
            )}
          />
          {loading && (
            <div className='text-center'>
              <Spin />
            </div>
          )}
        </div>

        <Input.Search
          placeholder='Ask about medical camps...'
          enterButton={<SendOutlined />}
          value={input}
          onChange={e => setInput(e.target.value)}
          onSearch={handleSend}
          disabled={loading}
          size='large'
        />
      </Modal>
    </div>
  )
}

export default FAQSection
