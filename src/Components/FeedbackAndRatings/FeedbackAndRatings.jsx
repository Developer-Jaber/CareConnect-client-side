import { useState, useEffect } from 'react';
import { Card, Rate, Avatar, List, Tag, Divider } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';

const FeedbackAndRatings = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/feedback')
      .then(response => response.json())
      .then(data => setFeedbackData(data));
  }, []);

  return (
    <div className="mx-auto mt-4 md:mt-20 p-4 md:p-8 max-w-6xl">
      <h1 className="mb-20 font-bold text-[var(--text)] text-3xl md:text-4xl text-center">
        Participant Experiences
      </h1>
      
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {feedbackData.map((item) => (
          <Card
            key={item.id}
            className="shadow-lg hover:shadow-xl border-0 transition-all duration-300"
            bodyStyle={{ padding: '16px' }}
          >
            <div className="flex items-start gap-4 mb-3">
              <Avatar 
                size={48} 
                icon={<UserOutlined />} 
                className="bg-[var(--primary)]"
              />
              <div>
                <h3 className="font-bold text-lg">{item.participantName}</h3>
                <Tag color="blue" className="mt-1">{item.campName}</Tag>
              </div>
            </div>
            
            <Rate 
              disabled 
              defaultValue={item.rating} 
              className="mb-3 text-[var(--accent)]"
            />
            
            <Divider className="my-3" />
            
            <div className="flex items-start">
              <MessageOutlined className="mt-1 mr-2 text-[var(--secondary)]" />
              <p className="text-gray-700">{item.feedback}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackAndRatings;