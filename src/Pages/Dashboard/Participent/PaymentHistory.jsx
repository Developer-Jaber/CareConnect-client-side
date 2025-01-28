import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Mock API call to fetch payment history (replace with actual API)
  useEffect(() => {
    setPaymentHistory([
      {
        id: 1,
        campName: "Heart Health Camp",
        campFees: "$100",
        paymentStatus: "Paid",
        confirmationStatus: "Confirmed",
        transactionId: "TXN123456789",
      },
      {
        id: 2,
        campName: "Dental Hygiene Camp",
        campFees: "$80",
        paymentStatus: "Unpaid",
        confirmationStatus: "Pending",
        transactionId: null,
      },
    ]);
  }, []);

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
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => (
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
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => (text ? text : "N/A"),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 p-10 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl text-center text-white">
        Payment History
      </h1>
      <Table
        columns={columns}
        dataSource={paymentHistory}
        rowKey="id"
        className="bg-white shadow-md rounded-lg"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default PaymentHistory;
