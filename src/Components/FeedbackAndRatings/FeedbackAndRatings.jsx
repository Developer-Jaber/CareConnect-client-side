import { useState, useEffect } from "react";
import { Table, Rate, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const FeedbackAndRatings = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Mock API call to fetch feedback data 
  useEffect(() => {
    fetch('https://b10a12-server-side-developer-jaber.vercel.app/feedback')
      .then(response => response.json())
      .then(data => setFeedbackData(data))
  }, []);

  const columns = [
    {
      title: "Participant Name",
      dataIndex: "participantName",
      key: "participantName",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (text) => (
        <div className="flex items-center">
          <MessageOutlined className="mr-2" /> {text}
        </div>
      ),
    },
  ];

  return (
    <div className="shadow-xl mx-auto my-10 w-8/12">
      <h1 className="mb-8 font-bold text-[#1A8A83] text-3xl text-center">
        Feedback & Ratings
      </h1>
      <Table
        columns={columns}
        dataSource={feedbackData}
        rowKey="id"
        className="bg-white shadow-md rounded-lg"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default FeedbackAndRatings;
