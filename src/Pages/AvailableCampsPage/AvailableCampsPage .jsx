import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Input, Select } from "antd";
import { data, Link } from "react-router-dom";
import { SearchOutlined, SwapOutlined } from "@ant-design/icons";
import "./AvailableCampsPage.css";

const { Meta } = Card;
const { Option } = Select;

const AvailableCampsPage = () => {
  const [camps,setCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [layout, setLayout] = useState("three-column");
  const [filteredCamps, setFilteredCamps] = useState(camps);

  useEffect(()=>{
    fetch('http://localhost:5000/madical_camp')
    .then(res=>res.json())
    .then(data=>setCamps(data))
  },[])

  // Filter camps based on search query
  useEffect(() => {
    let filtered = camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCamps(filtered);
  }, [searchQuery, camps]);

  // Sort camps based on selected criteria
  useEffect(() => {
    let sorted = [...filteredCamps];
    if (sortOption === "most-registered") {
      sorted.sort((a, b) => b.participants - a.participants);
    } else if (sortOption === "fees") {
      sorted.sort((a, b) => a.fees - b.fees);
    } else if (sortOption === "alphabetical") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCamps(sorted);
  }, [sortOption]);

  
  return (
    <div className="mx-auto my-10 w-11/12 available-camps-page">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search for camps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "300px" }}
        />
        <Select
          placeholder="Sort by"
          value={sortOption}
          onChange={(value) => setSortOption(value)}
          style={{ width: "200px" }}
        >
          <Option value="most-registered">Most Registered</Option>
          <Option value="fees">Camp Fees</Option>
          <Option value="alphabetical">Alphabetical Order</Option>
        </Select>
        <Button
          type="primary"
          icon={<SwapOutlined />}
          onClick={() =>
            setLayout(layout === "three-column" ? "two-column" : "three-column")
          }
        >
          {layout === "three-column" ? "Switch to 2 Columns" : "Switch to 3 Columns"}
        </Button>
      </div>

      {/* Camp Cards */}
      <Row
        gutter={[16, 16]}
        className={layout === "three-column" ? "three-column" : "two-column"}
      >
        {filteredCamps.map((camp) => (
          <Col key={camp.id} xs={24} sm={12} lg={layout === "three-column" ? 8 : 12}>
            <Card
              hoverable
              cover={<img alt={camp.name} src={camp.image} />}
            >
              <Meta
                title={camp.name}
                description={
                  <div>
                    <p><strong>Date & Time:</strong> {camp.dateTime}</p>
                    <p><strong>Location:</strong> {camp.location}</p>
                    <p><strong>Healthcare Professional:</strong> {camp.professional}</p>
                    <p><strong>Participant Count:</strong> {camp.participants}</p>
                    <p><strong>Participant Count:</strong> {camp.fees}</p>
                  </div>
                }
              />
              <Link to={`/camp-details/${camp._id}`}>
                <Button type="primary" className="mt-4 w-full">
                  Details
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AvailableCampsPage;
