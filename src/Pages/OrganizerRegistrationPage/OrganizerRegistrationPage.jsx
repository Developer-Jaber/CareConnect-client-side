import { useState } from 'react';
import { Steps, Form, Input, Select, Upload, Button, message, Card, Typography } from 'antd';
import { UserOutlined, SolutionOutlined, BankOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

const OrganizerRegistrationPage = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Personal Info',
      icon: <UserOutlined />,
      content: <PersonalInfoForm form={form} />
    },
    {
      title: 'Organization',
      icon: <BankOutlined />,
      content: <OrganizationForm form={form} />
    },
    {
      title: 'Camp Proposal',
      icon: <SolutionOutlined />,
      content: <CampProposalForm form={form} />
    },
    {
      title: 'Verification',
      icon: <FileDoneOutlined />,
      content: <VerificationStep form={form} />
    }
  ];

  const next = () => {
    form.validateFields()
      .then(() => setCurrent(current + 1))
      .catch(err => console.log('Validation Failed:', err));
  };

  const prev = () => setCurrent(current - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch('/api/organizers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        message.success('Application submitted successfully!');
        // Redirect to dashboard or confirmation page
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      message.error('Submission failed. Please try again.');
    }
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl container">
      <Card className="shadow-lg">
        <Title level={2} className="mb-6 text-center">
          Become a Medical Camp Organizer
        </Title>
        <Steps current={current} className="mb-8">
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
        
        <div className="min-h-[300px] steps-content">
          {steps[current].content}
        </div>
        
        <div className="flex justify-between mt-8 steps-action">
          {current > 0 && (
            <Button onClick={prev}>
              Back
            </Button>
          )}
          {current < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit}>
              Submit Application
            </Button>
          )}
        </div>
      </Card>
      
      <Text className="block mt-6 text-center">
        Already have an organizer account? <Link to="/login">Log in here</Link>
      </Text>
    </div>
  );
};

// Form Components
const PersonalInfoForm = ({ form }) => (
  <Form form={form} layout="vertical" name="personal_info">
    <Form.Item
      name="fullName"
      label="Full Name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input placeholder="Dr. Ayesha Rahman" />
    </Form.Item>

    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Please enter a valid email' }
      ]}
    >
      <Input placeholder="example@domain.com" />
    </Form.Item>

    <Form.Item
      name="phone"
      label="Phone Number"
      rules={[{ required: true, message: 'Please input your phone number!' }]}
    >
      <Input addonBefore="+880" placeholder="1XXXXXXXXX" />
    </Form.Item>

    <Form.Item
      name="medicalLicense"
      label="Medical License Number (if applicable)"
    >
      <Input placeholder="BMDC-12345" />
    </Form.Item>
  </Form>
);

const OrganizationForm = ({ form }) => (
  <Form form={form} layout="vertical" name="organization">
    <Form.Item
      name="orgType"
      label="Organization Type"
      rules={[{ required: true }]}
    >
      <Select placeholder="Select type">
        <Option value="hospital">Hospital/Clinic</Option>
        <Option value="ngo">NGO</Option>
        <Option value="government">Government Body</Option>
        <Option value="individual">Individual</Option>
      </Select>
    </Form.Item>

    <Form.Item
      noStyle
      shouldUpdate={(prev, current) => prev.orgType !== current.orgType}
    >
      {({ getFieldValue }) => 
        getFieldValue('orgType') !== 'individual' ? (
          <Form.Item
            name="orgName"
            label="Organization Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        ) : null
      }
    </Form.Item>

    <Form.Item
      name="orgDocuments"
      label="Registration Documents"
      valuePropName="fileList"
      getValueFromEvent={e => e.fileList}
    >
      <Upload 
        action="/api/upload" 
        listType="picture"
        accept=".pdf,.jpg,.png"
        beforeUpload={() => false} // Prevent automatic upload
      >
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
    </Form.Item>
  </Form>
);

const CampProposalForm = ({ form }) => (
  <Form form={form} layout="vertical" name="camp_proposal">
    <Form.Item
      name="campName"
      label="Proposed Camp Name"
      rules={[{ required: true }]}
    >
      <Input placeholder="Free Diabetes Screening Camp" />
    </Form.Item>

    <Form.Item
      name="campType"
      label="Camp Specialty"
      rules={[{ required: true }]}
    >
      <Select mode="multiple" placeholder="Select specialties">
        <Option value="general">General Health Checkup</Option>
        <Option value="vaccination">Vaccination</Option>
        <Option value="dental">Dental Care</Option>
        <Option value="eye">Eye Care</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="targetParticipants"
      label="Expected Participants"
      rules={[{ required: true }]}
    >
      <InputNumber min={50} max={5000} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item
      name="proposalDoc"
      label="Detailed Proposal (PDF)"
      rules={[{ required: true }]}
      valuePropName="fileList"
      getValueFromEvent={e => e.fileList}
    >
      <Upload accept=".pdf" maxCount={1} beforeUpload={() => false}>
        <Button icon={<UploadOutlined />}>Upload Proposal</Button>
      </Upload>
    </Form.Item>
  </Form>
);

const VerificationStep = ({ form }) => {
  const values = form.getFieldsValue();
  
  return (
    <div className="verification-summary">
      <Title level={4} className="mb-4">Please verify your information:</Title>
      
      <div className="space-y-4">
        <div>
          <Text strong>Personal Information:</Text>
          <p>{values.fullName}</p>
          <p>{values.email}</p>
          <p>+880{values.phone}</p>
          {values.medicalLicense && <p>License: {values.medicalLicense}</p>}
        </div>
        
        <Divider />
        
        <div>
          <Text strong>Organization:</Text>
          <p>{values.orgType === 'individual' ? 'Individual' : values.orgName}</p>
        </div>
        
        <Divider />
        
        <div>
          <Text strong>Camp Proposal:</Text>
          <p>Name: {values.campName}</p>
          <p>Specialties: {values.campType?.join(', ')}</p>
          <p>Expected Participants: {values.targetParticipants}</p>
        </div>
      </div>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[{ required: true, message: 'You must agree to the terms' }]}
        className="mt-6"
      >
        <Checkbox>
          I agree to the <a href="/terms" target="_blank">Terms of Service</a> and confirm all information is accurate
        </Checkbox>
      </Form.Item>
    </div>
  );
};

export default OrganizerRegistrationPage;