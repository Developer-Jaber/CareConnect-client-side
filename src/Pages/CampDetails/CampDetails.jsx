import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import "./CampDetails.css"; // Optional custom styling
import { AuthContext } from "../../Provider/AuthProvider";
import { data, useLoaderData, useParams } from "react-router-dom";

const CampDetails = () => {
    const camp = useLoaderData();
  
  const {user} = useContext(AuthContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Show/Hide Modal
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleJoinCamp = () => {
    fetch(`https://b10a12-server-side-developer-jaber.vercel.app/madical_camp/${camp._id}`, {
      method: "PATCH",
    });
  };

  // Handle Form Submission
  const handleFormSubmit = (values) => {
    const participantData = {
      ...values,
      campName: camp.name,
      campFees: camp.fees,
      location: camp.location,
      professional: camp.professional,
      participantName: user.displayName,
      participantEmail: user.email,
    };

    // Save participant data to the backend
    fetch("https://b10a12-server-side-developer-jaber.vercel.app/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          message.success("You have successfully joined the camp!");
          handleJoinCamp();
          hideModal();
        } else {
          message.error(data.message || "Something went wrong!");
        }
      })
      .catch(() => message.error("Failed to join the camp. Please try again."));
  };

  return (
    <div className="bg-gray-100 shadow-lg mx-auto my-10 camp-details-page px-4 py-10 rounded-lg w-11/12 container">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col items-start gap-8">
        <img
          src={camp.image}
          alt={camp.name}
          className="shadow-md rounded-lg w-full md:w-1/2"
        />
        <div className="flex-1">
          <h1 className="font-bold text-blue-700 text-4xl">{camp.name}</h1>
          <p className="mt-2 text-gray-600 text-lg">{camp.description}</p>

          {/* Camp Details */}
          <div className="mt-6 text-lg">
            <p>
              <strong>Camp Fees:</strong> {camp.fees}
            </p>
            <p>
              <strong>Date & Time:</strong> {camp.dateTime}
            </p>
            <p>
              <strong>Location:</strong> {camp.location}
            </p>
            <p>
              <strong>Healthcare Professional:</strong> {camp.professional}
            </p>
            <p>
              <strong>Participants:</strong> {camp.participants}
            </p>
          </div>

          {/* Join Camp Button */}
          <button
            onClick={showModal}
            className="bg-[#42bb76] hover:bg-[#b8c7bf] mt-6 px-6 py-2 rounded-lg font-semibold text-gray-200 hover:text-gray-600 text-lg btn"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Join Camp"
        visible={isModalOpen}
        onCancel={hideModal}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            campName: camp.name,
            campFees: camp.fees,
            location: camp.location,
            professional: camp.professional,
            participantName: user?.displayName,
            participantEmail: user?.email,
          }}
        >
          <Form.Item label="Camp Name" name="campName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Camp Fees" name="campFees">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Healthcare Professional" name="professional">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Participant Name" name="participantName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Participant Email" name="participantEmail">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter your age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Select your gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Emergency Contact"
            name="emergencyContact"
            rules={[
              { required: true, message: "Please provide an emergency contact!" },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="text-right">
            {user?(<button
              type="submit"
              className="bg-[#42bb76] hover:bg-[#b8c7bf] mt-4 px-6 py-2 rounded-lg font-bold text-gray-200 hover:text-gray-600 btn"
            >
              Confirm Registration
            </button>) : (<span className="font-semibold text-red-500">For Confirm Ragistration you need to login before!</span>)}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CampDetails;
