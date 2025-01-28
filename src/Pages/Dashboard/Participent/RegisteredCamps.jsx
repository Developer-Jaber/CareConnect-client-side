import { useEffect, useState } from "react";
import { Table, Button, Tag, message, Modal, Input, Rate } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const RegisteredCamps = () => {
  const [camps, setCamps] = useState([]);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  // Mock API call to fetch camps (replace with actual API integration)
  useEffect(() => {
    setCamps([
      {
        id: 1,
        campName: "Heart Health Camp",
        campFees: "$100",
        participantName: "John Doe",
        paymentStatus: "Unpaid",
        confirmationStatus: "Pending",
      },
      {
        id: 2,
        campName: "Dental Hygiene Camp",
        campFees: "$80",
        participantName: "John Doe",
        paymentStatus: "Paid",
        confirmationStatus: "Confirmed",
      },
    ]);
  }, []);

  // Handle payment
  const handlePayment = (camp) => {
    // Mock payment logic (replace with actual Stripe integration)
    message.success(`Payment successful! Transaction ID: ${Math.random().toString(36).substring(2)}`);
    setCamps(
      camps.map((item) =>
        item.id === camp.id ? { ...item, paymentStatus: "Paid" } : item
      )
    );
  };

  // Handle cancellation
  const handleCancellation = (camp) => {
    if (camp.paymentStatus === "Paid") {
      message.error("Cannot cancel a paid camp");
      return;
    }
    setCamps(camps.filter((item) => item.id !== camp.id));
    message.success("Camp registration canceled successfully");
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    message.success(`Feedback submitted: "${feedback}" with rating ${rating} stars`);
    setFeedback("");
    setRating(0);
    setFeedbackModalVisible(false);
  };

  const columns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
    },
    {
      title: "Camp Fees",
      dataIndex: "campFees",
      key: "campFees",
    },
    {
      title: "Participant Name",
      dataIndex: "participantName",
      key: "participantName",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text, record) => (
        <Tag color={text === "Paid" ? "green" : "volcano"}>{text}</Tag>
      ),
    },
    {
      title: "Confirmation Status",
      dataIndex: "confirmationStatus",
      key: "confirmationStatus",
      render: (text) => (
        <Tag icon={text === "Confirmed" ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={text === "Confirmed" ? "green" : "orange"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {record.paymentStatus === "Unpaid" ? (
            <Button type="primary" onClick={() => handlePayment(record)}>
              Pay
            </Button>
          ) : (
            <Button type="dashed" disabled>
              Paid
            </Button>
          )}
          <Button
            type="danger"
            disabled={record.paymentStatus === "Paid"}
            onClick={() => handleCancellation(record)}
          >
            Cancel
          </Button>
          {record.paymentStatus === "Paid" && record.confirmationStatus === "Confirmed" && (
            <Button type="default" onClick={() => {
              setSelectedCamp(record);
              setFeedbackModalVisible(true);
            }}>
              Feedback
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-10 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl text-center text-white">Registered Camps</h1>
      <Table
        columns={columns}
        dataSource={camps}
        rowKey="id"
        className="bg-white shadow-md rounded-lg"
      />

      {/* Feedback Modal */}
      <Modal
        title={`Feedback for ${selectedCamp?.campName}`}
        visible={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        onOk={handleFeedbackSubmit}
        okText="Submit"
      >
        <Input.TextArea
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="mt-4">
          <Rate value={rating} onChange={setRating} />
        </div>
      </Modal>
    </div>
  );
};

export default RegisteredCamps;
