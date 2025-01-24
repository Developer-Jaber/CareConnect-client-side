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
    fetch(`http://localhost:5000/madical_camp/${camp._id}`, {
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
      participantName: user.name,
      participantEmail: user.email,
    };

    // Save participant data to the backend
    fetch("http://localhost:5000/participants", {
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
    <div className="bg-gray-100 shadow-lg mx-auto my-10 px-4 py-10 camp-details-page rounded-lg w-11/12 container">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col items-start gap-8">
        <img
          src={camp.image}
          alt={camp.name}
          className="shadow-md rounded-lg w-full md:w-1/2"
        />
        <div className="flex-1">
          <h1 className="font-bold text-4xl text-blue-700">{camp.name}</h1>
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
            className="mt-6 px-6 py-3 rounded-lg font-semibold text-lg btn btn-primary"
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
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-lg btn btn-primary"
            >
              Confirm Registration
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CampDetails;
