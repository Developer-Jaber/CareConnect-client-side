import React, { useContext, useEffect, useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Badge, 
  Avatar, 
  Tag,
  Divider,
  Steps,
  Table,
  Progress
} from 'antd';
import { 
  CalendarOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  StarOutlined,
  NotificationOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { AuthContext } from '../Provider/AuthProvider';
import { Bar, Pie, Line } from '@ant-design/charts';

const { Step } = Steps;

const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Mock data - replace with real API calls
  const stats = {
    totalCamps: 12,
    totalParticipants: 345,
    totalServices: 5,
    averageRating: 4.2,
    campChange: 15,
    participantChange: -5,
    serviceChange: 10,
    participantsPerCamp: [35, 42, 18, 65, 25],
    campNames: ['Camp A', 'Camp B', 'Camp C', 'Camp D', 'Camp E'],
    servicesDistribution: [
      { type: 'General', value: 35 },
      { type: 'Vaccine', value: 25 },
      { type: 'Dental', value: 20 },
      { type: 'Eye Care', value: 15 },
      { type: 'Other', value: 5 }
    ],
    monthlyParticipants: [20, 50, 30, 80, 100, 150, 120]
  };

  const upcomingCamps = [
    { id: 1, name: 'Free Health Checkup', location: 'Dhaka', date: '2023-12-15', type: 'General', participants: 45 },
    { id: 2, name: 'Vaccination Camp', location: 'Chittagong', date: '2023-12-20', type: 'Vaccine', participants: 32 },
    { id: 3, name: 'Dental Care Camp', location: 'Sylhet', date: '2023-12-25', type: 'Dental', participants: 28 }
  ];

  const notifications = [
    { id: 1, title: 'New camp approved', date: '2023-12-10', read: false },
    { id: 2, title: '5 new participants registered', date: '2023-12-09', read: true }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
      // In real app, fetch user role here
      setIsOrganizer(user?.email?.includes('org')); // Example logic
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <Progress percent={70} status="active" />
      </div>
    );
  }

  // Chart configurations
  const barConfig = {
    data: stats.campNames.map((name, index) => ({
      name,
      participants: stats.participantsPerCamp[index]
    })),
    xField: 'name',
    yField: 'participants',
    colorField: 'name',
    height: 300,
    legend: false,
    interactions: [{ type: 'element-active' }],
  };

  const pieConfig = {
    data: stats.servicesDistribution,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    height: 300,
    legend: false,
    label: {
      type: 'spider',
      content: '{name}\n{percentage}'
    },
    interactions: [{ type: 'element-active' }],
  };

  const lineConfig = {
    data: stats.monthlyParticipants.map((count, index) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index],
      participants: count
    })),
    xField: 'month',
    yField: 'participants',
    height: 300,
    point: {
      size: 5,
      shape: 'diamond',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            {isOrganizer ? 'Organizer Dashboard' : 'Participant Dashboard'}
          </h1>
          <p style={{ color: '#666' }}>Welcome back, {user?.displayName || 'User'}!</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Badge count={notifications.filter(n => !n.read).length}>
            <NotificationOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Badge>
          <Avatar 
            src={user?.photoURL} 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatCard 
            icon={<CalendarOutlined style={{ color: '#1890ff' }} />}
            title={isOrganizer ? "Your Camps" : "Joined Camps"}
            value={stats.totalCamps}
            change={stats.campChange}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard 
            icon={<TeamOutlined style={{ color: '#52c41a' }} />}
            title="Total Participants"
            value={stats.totalParticipants}
            change={stats.participantChange}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard 
            icon={<MedicineBoxOutlined style={{ color: '#f5222d' }} />}
            title="Services Offered"
            value={stats.totalServices}
            change={stats.serviceChange}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard 
            icon={<StarOutlined style={{ color: '#faad14' }} />}
            title="Average Rating"
            value={stats.averageRating}
            isRating={true}
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Charts Section */}
        <Col xs={24} lg={16}>
          <Card 
            title="Participation Overview" 
            style={{ marginBottom: 24 }}
          >
            <Bar {...barConfig} />
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card title="Service Distribution">
                <Pie {...pieConfig} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Monthly Trend">
                <Line {...lineConfig} />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Sidebar Section */}
        <Col xs={24} lg={8}>
          <UpcomingCamps camps={upcomingCamps} />
          {isOrganizer && <OrganizerTools />}
          <NotificationsPanel notifications={notifications} />
        </Col>
      </Row>
    </div>
  );
};

// Component: Stat Card
const StatCard = ({ icon, title, value, change, isRating = false }) => {
  const isPositive = change >= 0;

  return (
    <Card>
      <Statistic
        title={title}
        value={isRating ? value.toFixed(1) : value}
        prefix={icon}
        suffix={isRating ? '/5' : null}
      />
      {change !== undefined && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          color: isPositive ? '#52c41a' : '#f5222d',
          marginTop: 8
        }}>
          {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          <span style={{ marginLeft: 4 }}>
            {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
          </span>
        </div>
      )}
    </Card>
  );
};

// Component: Upcoming Camps
const UpcomingCamps = ({ camps }) => (
  <Card 
    title={
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Upcoming Camps</span>
        <CalendarOutlined />
      </div>
    }
    style={{ marginBottom: 24 }}
  >
    <div style={{ display: 'grid', gap: 16 }}>
      {camps.map(camp => (
        <div key={camp.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
          <div style={{ fontWeight: 500 }}>{camp.name}</div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            color: '#666',
            fontSize: 14,
            margin: '8px 0'
          }}>
            <span>{camp.location}</span>
            <span>{new Date(camp.date).toLocaleDateString()}</span>
          </div>
          <div>
            <Tag color="blue" style={{ marginRight: 8 }}>{camp.type}</Tag>
            <Tag color="green">{camp.participants} registered</Tag>
          </div>
        </div>
      ))}
      <Button type="link" block>View All Camps</Button>
    </div>
  </Card>
);

// Component: Organizer Tools
const OrganizerTools = () => (
  <Card 
    title="Quick Actions"
    style={{ marginBottom: 24 }}
  >
    <div style={{ display: 'grid', gap: 12 }}>
      <Button type="primary" icon={<PlusOutlined />} block>
        Create New Camp
      </Button>
      <Button icon={<TeamOutlined />} block>
        Manage Volunteers
      </Button>
      <Button icon={<FileTextOutlined />} block>
        View Reports
      </Button>
    </div>
  </Card>
);

// Component: Notifications Panel
const NotificationsPanel = ({ notifications }) => (
  <Card title="Recent Notifications">
    <div style={{ display: 'grid', gap: 12 }}>
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          style={{ 
            padding: 12,
            borderRadius: 8,
            backgroundColor: !notification.read ? '#e6f7ff' : 'transparent'
          }}
        >
          <div style={{ fontWeight: 500 }}>{notification.title}</div>
          <div style={{ color: '#666', fontSize: 12 }}>
            {new Date(notification.date).toLocaleString()}
          </div>
        </div>
      ))}
      <Button type="link" block>See All Notifications</Button>
    </div>
  </Card>
);

export default DashboardMain;