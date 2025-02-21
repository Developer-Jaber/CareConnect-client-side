import { useContext, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../Provider/AuthProvider";

const PaymentHistory = () => {
  const {user} = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Mock API call to fetch payment history 
  useEffect(() => {
    fetch(`https://b10a12-server-side-developer-jaber.vercel.app/participants/email/${user?.email}`)
      .then(response => response.json())
      .then(data => setPaymentHistory(data))
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
      dataIndex: "trxID",
      key: "trxID",
      render: (text) => (text ? `TXN${text}` : "N/A"),
    },
  ];

  return (
    <div className="p-10 min-h-screen">
      <h1 className="mb-10 font-bold text-[#1A8A83] text-3xl text-center">
        Payment History
      </h1>
      <Table
        columns={columns}
        dataSource={paymentHistory}
        rowKey="id"
        className="bg-white shadow-xl rounded-lg"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default PaymentHistory;
