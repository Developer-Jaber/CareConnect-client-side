import { useState, useEffect } from "react";
import { Table, Rate, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const FeedbackAndRatings = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Mock API call to fetch feedback data (replace with actual API)
  useEffect(() => {
    setFeedbackData([
      {
        id: 1,
        participantName: "John Doe",
        campName: "Heart Health Camp",
        rating: 5,
        feedback: "The camp was amazing and insightful!",
      },
      {
        id: 2,
        participantName: "Jane Smith",
        campName: "Dental Hygiene Camp",
        rating: 4,
        feedback: "Great experience, but more time for Q&A would be nice.",
      },
    ]);
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
      <h1 className="mb-8 font-bold text-3xl text-center">
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
