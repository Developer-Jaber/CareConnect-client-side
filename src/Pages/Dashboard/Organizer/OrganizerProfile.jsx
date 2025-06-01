import { useContext, useState } from 'react';
import { 
  Card, 
  Avatar, 
  Button, 
  Divider, 
  Descriptions, 
  Input, 
  Form, 
  Select, 
  Tag,
  Tabs,
  Space,
  message
} from 'antd';
import { 
  EditOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  LinkOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  SaveOutlined,
  UserOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../../Provider/AuthProvider';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  
  // Sample data - replace with actual API data
  const [profile, setProfile] = useState({
    name: user?.displayName || 'Organizer Name',
    email: user?.email || 'example@medcamp.org',
    phone: '+8801XXXXXXXXX',
    organization: 'Healthcare NGO',
    position: 'Camp Coordinator',
    bio: 'Experienced medical camp organizer with 5+ years in community health initiatives',
    address: '123 Medical Street, Dhaka, Bangladesh',
    socialLinks: {
      facebook: 'https://facebook.com/profile',
      twitter: 'https://twitter.com/profile',
      linkedin: 'https://linkedin.com/in/profile',
      website: 'https://our-organization.org'
    },
    expertise: ['Public Health', 'Vaccination', 'First Aid']
  });

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        setProfile({...profile, ...values});
        message.success('Profile updated successfully');
        setEditing(false);
      })
      .catch(err => console.log('Validation failed:', err));
  };

  const renderEditButton = () => (
    <Button 
      type="text" 
      icon={editing ? <SaveOutlined /> : <EditOutlined />} 
      onClick={editing ? handleSave : () => setEditing(true)}
      className="top-4 right-4 z-10 absolute"
    >
      {editing ? 'Save' : 'Edit'}
    </Button>
  );

  const renderProfileInfo = () => (
    <div className="text-center">
      <Avatar 
        size={128} 
        src={user?.photoURL} 
        icon={<UserOutlined />}
        className="shadow-md border-[#1A8A83] border-2"
      />
      <h1 className="mt-4 font-bold text-2xl">{profile.name}</h1>
      <p className="flex justify-center items-center text-gray-600">
        <MailOutlined className="mr-1" /> {profile.email}
      </p>
      <div className="mt-2">
        {profile.expertise.map((skill, index) => (
          <Tag color="#1A8A83" key={index} className="m-1">{skill}</Tag>
        ))}
      </div>
    </div>
  );

  const renderEditableProfile = () => (
    <Form form={form} initialValues={profile} layout="vertical">
      <div className="text-center">
        <Avatar 
          size={128} 
          src={user?.photoURL} 
          icon={<UserOutlined />}
          className="shadow-md mb-4 border-[#1A8A83] border-2"
        />
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input className="font-bold text-2xl text-center" />
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="mx-auto p-4 max-w-5xl">
      <Card 
        title="Organizer Profile" 
        className="relative shadow-lg"
        extra={renderEditButton()}
      >
        {editing ? renderEditableProfile() : renderProfileInfo()}

        <Divider />

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><InfoCircleOutlined /> About</span>} key="1">
            {editing ? (
              <Form form={form}>
                <Form.Item name="bio" label="Bio">
                  <TextArea rows={4} placeholder="Tell us about yourself and your experience" />
                </Form.Item>
                <Form.Item name="organization" label="Organization">
                  <Input />
                </Form.Item>
                <Form.Item name="position" label="Position">
                  <Input />
                </Form.Item>
              </Form>
            ) : (
              <>
                <p className="mb-4 text-gray-700">{profile.bio}</p>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Organization">{profile.organization}</Descriptions.Item>
                  <Descriptions.Item label="Position">{profile.position}</Descriptions.Item>
                </Descriptions>
              </>
            )}
          </TabPane>

          <TabPane tab={<span><UserOutlined /> Personal Info</span>} key="2">
            {editing ? (
              <Form form={form}>
                <Form.Item name="phone" label="Phone">
                  <Input addonBefore="+880" />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input prefix={<EnvironmentOutlined />} />
                </Form.Item>
                <Form.Item name="expertise" label="Areas of Expertise">
                  <Select mode="tags" placeholder="Add your skills">
                    <Option value="Public Health">Public Health</Option>
                    <Option value="Vaccination">Vaccination</Option>
                    <Option value="First Aid">First Aid</Option>
                    <Option value="Nutrition">Nutrition</Option>
                    <Option value="Mental Health">Mental Health</Option>
                  </Select>
                </Form.Item>
              </Form>
            ) : (
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Phone">
                  <PhoneOutlined /> {profile.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  <EnvironmentOutlined /> {profile.address}
                </Descriptions.Item>
                <Descriptions.Item label="Expertise">
                  {profile.expertise.map((skill, index) => (
                    <Tag color="#1A8A83" key={index}>{skill}</Tag>
                  ))}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          <TabPane tab={<span><LinkOutlined /> Social Links</span>} key="3">
            {editing ? (
              <Form form={form}>
                <Form.Item name={['socialLinks', 'facebook']} label="Facebook">
                  <Input addonBefore={<FacebookOutlined />} placeholder="https://facebook.com/username" />
                </Form.Item>
                <Form.Item name={['socialLinks', 'twitter']} label="Twitter">
                  <Input addonBefore={<TwitterOutlined />} placeholder="https://twitter.com/username" />
                </Form.Item>
                <Form.Item name={['socialLinks', 'linkedin']} label="LinkedIn">
                  <Input addonBefore={<LinkedinOutlined />} placeholder="https://linkedin.com/in/username" />
                </Form.Item>
                <Form.Item name={['socialLinks', 'website']} label="Website">
                  <Input addonBefore={<LinkOutlined />} placeholder="https://your-website.org" />
                </Form.Item>
              </Form>
            ) : (
              <Space direction="vertical" className="w-full">
                {profile.socialLinks.facebook && (
                  <Button 
                    type="link" 
                    icon={<FacebookOutlined />}
                    href={profile.socialLinks.facebook}
                    target="_blank"
                  >
                    Facebook Profile
                  </Button>
                )}
                {profile.socialLinks.twitter && (
                  <Button 
                    type="link" 
                    icon={<TwitterOutlined />}
                    href={profile.socialLinks.twitter}
                    target="_blank"
                  >
                    Twitter Profile
                  </Button>
                )}
                {profile.socialLinks.linkedin && (
                  <Button 
                    type="link" 
                    icon={<LinkedinOutlined />}
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                  >
                    LinkedIn Profile
                  </Button>
                )}
                {profile.socialLinks.website && (
                  <Button 
                    type="link" 
                    icon={<LinkOutlined />}
                    href={profile.socialLinks.website}
                    target="_blank"
                  >
                    Organization Website
                  </Button>
                )}
                {!profile.socialLinks.facebook && 
                 !profile.socialLinks.twitter && 
                 !profile.socialLinks.linkedin && 
                 !profile.socialLinks.website && (
                  <p className="text-gray-500 italic">No social links added yet</p>
                )}
              </Space>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrganizerProfile;