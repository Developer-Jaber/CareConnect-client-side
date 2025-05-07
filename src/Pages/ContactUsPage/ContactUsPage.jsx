import { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Divider, Card, Avatar, Tag } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { MdOutlineEmergency } from 'react-icons/md';
// import { EmergencyOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ContactUsPage = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Message sent successfully! We\'ll respond within 24 hours.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--background)] px-6 md:px-16 lg:px-24 py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <Tag className="bg-[var(--primary)] mb-6 px-6 py-2 text-white text-lg">
          GET IN TOUCH
        </Tag>
        <h1 className="mb-6 font-bold text-[var(--text)] text-4xl md:text-5xl">
          We're Here to Help
        </h1>
        <p className="opacity-90 mx-auto max-w-3xl text-[var(--text)] text-xl">
          Have questions about medical camps? Want to volunteer or partner with us? Reach out below.
        </p>
      </div>

      <Row gutter={[32, 32]}>
        {/* Contact Form */}
        <Col xs={24} md={12}>
          <Card className="shadow-md border-0">
            <h2 className="mb-6 font-bold text-2xl">Send Us a Message</h2>
            <Form
              form={form}
              name="contact"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  placeholder="Your Name" 
                  size="large" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { 
                    required: true, 
                    message: 'Please enter your email',
                    type: 'email'
                  }
                ]}
              >
                <Input 
                  placeholder="Email Address" 
                  size="large" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input 
                  placeholder="Subject" 
                  size="large" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  placeholder="Your Message" 
                  rows={6} 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  loading={isSubmitting}
                  className="bg-[var(--primary)] hover:bg-[var(--accent)] rounded-lg w-full h-12"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Contact Info */}
        <Col xs={24} md={12}>
          <Card className="shadow-md border-0 h-full">
            <h2 className="mb-6 font-bold text-2xl">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  icon={<MailOutlined />} 
                  className="bg-[var(--primary)/10] text-[var(--primary)]"
                />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-700">contact@medcamp.org</p>
                  <p className="text-gray-700">support@medcamp.org</p>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  icon={<PhoneOutlined />} 
                  className="bg-[var(--primary)/10] text-[var(--primary)]"
                />
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-700">+880 1234 567890 (Office)</p>
                  <p className="text-gray-700">+880 9876 543210 (Emergency)</p>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Address */}
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  icon={<EnvironmentOutlined />} 
                  className="bg-[var(--primary)/10] text-[var(--primary)]"
                />
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-gray-700">
                    123 Healthcare Avenue<br />
                    Dhaka 1212, Bangladesh
                  </p>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  icon={<ClockCircleOutlined />} 
                  className="bg-[var(--primary)/10] text-[var(--primary)]"
                />
                <div>
                  <h3 className="font-bold text-lg">Office Hours</h3>
                  <p className="text-gray-700">Sunday-Thursday: 9AM - 5PM</p>
                  <p className="text-gray-700">Friday-Saturday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-8 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7301.570028277349!2d90.40716157468712!3d23.793812338517805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70b72f1b8b1%3A0xfc87a1bc6699ed26!2sDhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Emergency CTA */}
      <div className="bg-red-50 mt-16 p-8 border border-red-100 rounded-xl text-center">
        <h2 className="mb-4 font-bold text-red-600 text-2xl">
          <MdOutlineEmergency className="mr-2" />
          Need Immediate Assistance?
        </h2>
        <p className="mb-6 text-lg">
          For medical emergencies during camps, call our 24/7 helpline:
        </p>
        <Button 
          size="large" 
          className="bg-red-600 hover:bg-red-700 px-8 rounded-lg h-12 text-white"
          icon={<PhoneOutlined />}
        >
          +880 9876 543210
        </Button>
      </div>
    </div>
  );
};


export default ContactUsPage;