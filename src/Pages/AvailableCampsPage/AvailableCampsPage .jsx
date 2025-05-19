import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Input, Select, Tag, Rate, Spin, Empty } from 'antd';
import { SearchOutlined, StarFilled, EnvironmentOutlined, CalendarOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './AvailableCampsPage.css';

const { Meta } = Card;
const { Option } = Select;

const AvailableCampsPage = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('most-registered');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    dateRange: [],
    professionalType: ''
  });

  // Fetch camps data
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://b10a12-server-side-developer-jaber.vercel.app/madical_camp');
        const data = await response.json();
        setCamps(data);
        setFilteredCamps(data);
      } catch (error) {
        console.error('Error fetching camps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  // Filter and sort camps
  useEffect(() => {
    let result = [...camps];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(camp =>
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.professional.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply additional filters
    if (filters.location) {
      result = result.filter(camp => camp.location === filters.location);
    }
    if (filters.professionalType) {
      result = result.filter(camp => camp.professionalType === filters.professionalType);
    }

    // Apply sorting
    switch (sortOption) {
      case 'most-registered':
        result.sort((a, b) => b.participants - a.participants);
        break;
      case 'highest-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'fees':
        result.sort((a, b) => a.fees - b.fees);
        break;
      case 'date':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredCamps(result);
  }, [camps, searchQuery, sortOption, filters]);

  // Extract unique locations and professional types for filters
  const locations = [...new Set(camps.map(camp => camp.location))];
  const professionalTypes = [...new Set(camps.map(camp => camp.professionalType))];

  return (
    <div className="available-camps-page">
      {/* Page Header */}
      <div className="my-20 page-header">
        <h1 className="page-title">Available Medical Camps</h1>
        <p className="text-[1rem] md:text-xl">Find and join health camps in your area</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section mt-20">
        <div className="search-bar">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search camps by name, location or specialist..."
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </div>

        <div className="filter-controls">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Filter by location"
                size="large"
                style={{ width: '100%' }}
                onChange={(value) => setFilters({...filters, location: value})}
                allowClear
              >
                {locations.map(location => (
                  <Option key={location} value={location}>{location}</Option>
                ))}
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Filter by specialist"
                size="large"
                style={{ width: '100%' }}
                onChange={(value) => setFilters({...filters, professionalType: value})}
                allowClear
              >
                {professionalTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Sort by"
                size="large"
                style={{ width: '100%' }}
                defaultValue="most-registered"
                onChange={(value) => setSortOption(value)}
              >
                <Option value="most-registered">Most Registered</Option>
                <Option value="highest-rated">Highest Rated</Option>
                <Option value="date">Upcoming First</Option>
                <Option value="fees">Camp Fees</Option>
                <Option value="alphabetical">Alphabetical</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Button 
                type="default" 
                size="large" 
                style={{ width: '100%' }}
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    location: '',
                    professionalType: ''
                  });
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Camps Grid */}
      {loading ? (
        <div className="loading-state">
          <Spin size="large" />
          <p>Loading available camps...</p>
        </div>
      ) : filteredCamps.length === 0 ? (
        <div className="empty-state">
          <Empty
            description={
              <span>
                No camps found matching your criteria. <br />
                Try adjusting your filters or check back later.
              </span>
            }
          />
          <Button 
            type="primary" 
            size="large"
            onClick={() => {
              setSearchQuery('');
              setFilters({
                location: '',
                professionalType: ''
              });
            }}
          >
            Show All Camps
          </Button>
        </div>
      ) : (
        <Row gutter={[24, 24]} className="camps-grid">
          {filteredCamps.map(camp => (
            <Col key={camp._id} xs={24} sm={12} lg={8} xl={6}>
              <Card
                hoverable
                className="camp-card"
                cover={
                  <div className="camp-image-container">
                    <img 
                      alt={camp.name} 
                      src={camp.image || '/default-camp.jpg'} 
                      className="camp-image"
                    />
                    {camp.isNew && <Tag className="new-tag">NEW</Tag>}
                    {camp.isFree && <Tag className="free-tag">FREE</Tag>}
                  </div>
                }
              >
                <div className="camp-content">
                  <div className="camp-header">
                    <h2 className="camp-title">{camp.name}</h2>
                    <div className="camp-rating">
                      <Rate 
                        disabled 
                        defaultValue={camp.rating || 4} 
                        character={<StarFilled />}
                        style={{ color: '#FFC107', fontSize: 16 }}
                      />
                      <span>({camp.reviews || 12})</span>
                    </div>
                  </div>
                  
                  <div className="camp-meta">
                    <div className="meta-item">
                      <CalendarOutlined />
                      <span>{camp.dateTime || 'Coming soon'}</span>
                    </div>
                    <div className="meta-item">
                      <EnvironmentOutlined />
                      <span>{camp.location}</span>
                    </div>
                    <div className="meta-item">
                      <UserOutlined />
                      <span>{camp.professional}</span>
                    </div>
                    <div className="meta-item">
                      <TeamOutlined />
                      <span>{camp.participants || 0} participants</span>
                    </div>
                  </div>
                  
                  <div className="camp-footer">
                    <div className="camp-fees">
                      {camp.fees ? (
                        <span className="fee-amount">${camp.fees}</span>
                      ) : (
                        <span className="free-text">Free Entry</span>
                      )}
                    </div>
                    <Link to={`/camp-details/${camp._id}`}>
                      <button className="flex justify-center items-center gap-2 bg-[#2fbc2f] hover:bg-[var(--accent)] mt-4 py-2 rounded-lg w-full font-bold text-[#090109] transition-all duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Email Subscription */}
      <div className="my-32 subscription-section">
        <h3 className='text-[1rem] md:text-xl'>Want updates on new camps in your area?</h3>
        <div className="subscription-form">
          <Input 
            placeholder="Enter your email" 
            size="large"
            style={{ flex: 1 }}
          />
          <Button className='bg-[var(--secondary)] hover:bg-[var(--accent)] hover:border-none rounded-lg h-12' size="large">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailableCampsPage;