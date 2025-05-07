import { Tag, Card, Row, Col, Divider, Button } from 'antd';
import { UserOutlined, TeamOutlined, HeartOutlined, AimOutlined, MedicineBoxOutlined } from '@ant-design/icons';


const AboutUsPage = () => {
  return (
    <div className="bg-[var(--background)] px-6 md:px-16 lg:px-24 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Tag className="bg-[var(--primary)] mb-6 px-6 py-2 text-white text-lg">
          OUR STORY
        </Tag>
        <h1 className="mb-6 font-bold text-[var(--text)] text-4xl md:text-5xl">
          Bridging Healthcare Gaps, One Camp at a Time
        </h1>
        <p className="opacity-90 mx-auto max-w-3xl text-[var(--text)] text-xl">
          We're a passionate team of healthcare professionals and technologists committed to making quality medical care accessible to all communities.
        </p>
      </div>

      {/* Mission Cards */}
      <Row gutter={[24, 24]} className="mb-20">
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-sm border-0 h-full text-center">
            <MedicineBoxOutlined className="mb-4 text-[var(--primary)] text-4xl" />
            <h3 className="mb-2 font-bold text-xl">150+ Camps</h3>
            <p>Organized across urban and rural areas</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-sm border-0 h-full text-center">
            <TeamOutlined className="mb-4 text-[var(--primary)] text-4xl" />
            <h3 className="mb-2 font-bold text-xl">300+ Professionals</h3>
            <p>Doctors, nurses, and volunteers</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-sm border-0 h-full text-center">
            <HeartOutlined className="mb-4 text-[var(--primary)] text-4xl" />
            <h3 className="mb-2 font-bold text-xl">50,000+ Lives</h3>
            <p>Impacted through our initiatives</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-sm border-0 h-full text-center">
            <AimOutlined className="mb-4 text-[var(--primary)] text-4xl" />
            <h3 className="mb-2 font-bold text-xl">12 Regions</h3>
            <p>Served across the country</p>
          </Card>
        </Col>
      </Row>

      {/* Our Story */}
      <div className="mx-auto mb-20 max-w-4xl">
        <Divider orientation="left" className="font-bold text-xl">
          Our Journey
        </Divider>
        <p className="mb-6 text-lg">
          Founded in 2020 during the pandemic, we recognized the critical gap between healthcare providers and underserved communities. What began as a small team organizing local health camps has grown into a national movement leveraging technology to streamline medical outreach.
        </p>
        <p className="text-lg">
          Our platform now connects <span className="font-medium text-[var(--primary)]">medical professionals</span>, <span className="font-medium text-[var(--primary)]">local authorities</span>, and <span className="font-medium text-[var(--primary)]">volunteers</span> to deliver efficient, scalable health interventions where they're needed most.
        </p>
      </div>

      {/* Team Section */}
      <div className="mb-16 text-center">
        <Tag className="bg-[var(--secondary)] mb-6 px-6 py-2 text-[var(--text)] text-lg">
          OUR LEADERSHIP
        </Tag>
        <h2 className="mb-12 font-bold text-[var(--text)] text-3xl">
          Driven by Compassion, Led by Experts
        </h2>
        <Row gutter={[24, 24]} justify="center">
          {[
            { name: "Dr. Ayesha Khan", role: "Medical Director", specialty: "Public Health" },
            { name: "Rahim Ahmed", role: "Tech Lead", specialty: "Health Informatics" },
            { name: "Fatima Begum", role: "Field Coordinator", specialty: "Community Medicine" }
          ].map((member, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div className="flex justify-center items-center bg-gray-100 h-48">
                    <UserOutlined className="text-gray-400 text-5xl" />
                  </div>
                }
                className="shadow-sm border-0"
              >
                <Card.Meta
                  title={<h3 className="font-bold">{member.name}</h3>}
                  description={
                    <>
                      <p className="text-[var(--primary)]">{member.role}</p>
                      <p className="text-sm">{member.specialty}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA */}
      <div className="bg-[var(--primary)/10] p-12 rounded-xl text-center">
        <h2 className="mb-6 font-bold text-[var(--text)] text-2xl md:text-3xl">
          Ready to Make an Impact?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="large" 
            className="bg-[var(--primary)] hover:bg-[var(--accent)] px-8 h-12 text-white"
          >
            Join as Volunteer
          </Button>
          <Button 
            size="large" 
            className="bg-white px-8 border-[var(--primary)] h-12 text-[var(--primary)] hover:text-[var(--accent)]"
          >
            Organize a Camp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;