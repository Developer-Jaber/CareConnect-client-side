import { useState } from 'react';
import { Card, Tag, Input, Button, Row, Col, Pagination, Divider } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined, BookOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample blog data (replace with API fetch)
  const blogPosts = [
    {
      id: 1,
      title: "How to Prepare for Your First Medical Camp Visit",
      excerpt: "A step-by-step guide for first-time participants including what to bring and what to expect during screenings.",
      category: 'patient-guide',
      date: 'May 15, 2024',
      author: 'Dr. Ayesha Rahman',
      readTime: '5 min read',
      image: '/blog/medical-camp-prep.jpg',
      likes: 142,
      shares: 56,
      isFeatured: true
    },
    {
      id: 2,
      title: "The Impact of Mobile Clinics in Rural Bangladesh",
      excerpt: "Exploring how our traveling medical camps have reduced child mortality rates by 27% in remote areas.",
      category: 'success-stories',
      date: 'April 28, 2024',
      author: 'Public Health Team',
      readTime: '8 min read',
      image: '/blog/rural-impact.jpg',
      likes: 89,
      shares: 34,
      isFeatured: false
    },
    // Add 10+ more posts...
  ];

  // Filter logic
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const pageSize = 6;
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Categories (unique from posts)
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'patient-guide', name: 'Patient Guides' },
    { id: 'success-stories', name: 'Success Stories' },
    { id: 'medical-research', name: 'Medical Research' },
    { id: 'volunteer-journeys', name: 'Volunteer Stories' },
    { id: 'preventive-care', name: 'Preventive Care' }
  ];

  return (
    <div className="bg-[var(--background)] px-6 md:px-16 lg:px-24 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Tag className="bg-[var(--primary)] mb-6 px-6 py-2 text-white text-lg">
          KNOWLEDGE CENTER
        </Tag>
        <h1 className="mb-6 font-bold text-[var(--text)] text-4xl md:text-5xl">
          Insights for Healthier Communities
        </h1>
        <p className="opacity-90 mx-auto max-w-3xl text-[var(--text)] text-xl">
          Evidence-based articles, camp experiences, and medical guidance from our team
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex md:flex-row flex-col gap-4 mb-8">
          <Input
            placeholder="Search articles..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow rounded-lg"
          />
          <Button 
            type="secondary" 
            size="large" 
            className="bg-[var(--secondary)] hover:bg-[var(--accent)] p-3 h-full"
          >
            Advanced Filters
          </Button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <Button
              key={category.id}
              shape="round"
              size="middle"
              className={`border-[var(--primary)] ${activeCategory === category.id ? 'bg-[var(--primary)] text-white' : 'text-[var(--primary)]'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post (Unique Element) */}
      {blogPosts.some(post => post.isFeatured) && (
        <div className="mb-16">
          <h2 className="flex items-center mb-6 font-bold text-2xl">
            <BookOutlined className="mr-3 text-[var(--primary)]" />
            Editor's Pick
          </h2>
          <Card
            hoverable
            className="shadow-lg border-0"
            cover={
              <img 
                alt="Featured post" 
                src={blogPosts.find(post => post.isFeatured).image} 
                className="w-full h-64 md:h-96 object-cover"
              />
            }
          >
            <div className="p-6">
              <Tag color="var(--primary)" className="mb-3 text-white">
                Featured
              </Tag>
              <h3 className="mb-3 font-bold text-2xl md:text-3xl">
                {blogPosts.find(post => post.isFeatured).title}
              </h3>
              <p className="mb-4 text-lg">
                {blogPosts.find(post => post.isFeatured).excerpt}
              </p>
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-4 text-gray-600">
                  <span><UserOutlined /> {blogPosts.find(post => post.isFeatured).author}</span>
                  <span><CalendarOutlined /> {blogPosts.find(post => post.isFeatured).date}</span>
                </div>
                <Button 
                  type="primary" 
                  className="bg-[var(--primary)] hover:bg-[var(--accent)]"
                >
                  Read Full Article
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Grid */}
      <Row gutter={[24, 24]} className="mb-12">
        {currentPosts.map(post => (
          <Col key={post.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              className="flex flex-col shadow-md border-0 h-full"
              cover={
                <img 
                  alt={post.title} 
                  src={post.image} 
                  className="w-full h-48 object-cover"
                />
              }
            >
              <div className="flex-grow p-4">
                <Tag color="var(--secondary)" className="mb-3">
                  {categories.find(cat => cat.id === post.category)?.name}
                </Tag>
                <h3 className="mb-3 font-bold text-xl line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-4 text-gray-700 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-4 border-gray-100 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    <CalendarOutlined className="mr-1" /> {post.date}
                  </span>
                  <div className="flex gap-3">
                    <Button type="text" icon={<HeartOutlined />} className="text-gray-500">
                      {post.likes}
                    </Button>
                    <Button type="text" icon={<ShareAltOutlined />} className="text-gray-500">
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredPosts.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          className="mt-6"
          showSizeChanger={false}
        />
      </div>

      {/* Newsletter CTA */}
      <div className="bg-[var(--primary)/10] mt-20 p-8 md:p-12 rounded-xl text-center">
        <h2 className="mb-4 font-bold text-2xl md:text-3xl">
          Stay Updated with Medical Insights
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg">
          Subscribe to receive our latest articles and camp updates directly in your inbox
        </p>
        <div className="flex md:flex-row flex-col gap-3 mx-auto max-w-md">
          <Input 
            placeholder="Your email address" 
            size="large" 
            className="flex-grow rounded-lg"
          />
          <Button 
            type="primary" 
            size="large" 
            className="bg-[var(--primary)] hover:bg-[var(--accent)] whitespace-nowrap"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};


export default BlogPage;