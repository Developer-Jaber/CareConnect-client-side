import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import "./PopularCamps.css"; 

const { Meta } = Card;

const PopularCamps = () => {
    const [camps,setCamps] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/madical_camp')
        .then(res=>res.json())
        .then(data=>setCamps(data))
    },[])

  // Limit to a maximum of six camps sorted by participant count
  const popularCamps = camps
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6);

  return (
    <div className="mx-auto py-12 w-11/12 popular-camps-section">
      <div className="mx-auto px-4 container">
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="font-bold text-[#1A8A83] text-3xl">Popular Medical Camps</h2>
          <p className="mt-2 text-gray-600">Discover our top-rated medical camps with the highest participation!</p>
        </div>

        {/* Camp Cards */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {popularCamps.map((camp) => (
            <Card
              key={camp.id}
              hoverable
              className="shadow-lg camp-card rounded-lg"
              cover={
                <img
                  alt={camp.name}
                  src={camp.image}
                  className="rounded-t-lg w-full h-56 object-cover"
                />
              }
            >
              <Meta
                title={<h3 className="font-semibold text-blue-800 text-xl">{camp.name}</h3>}
                description={
                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Fees:</strong> ${camp.fees}
                    </p>
                    <p>
                      <strong>Date & Time:</strong> {camp.dateTime}
                    </p>
                    <p>
                      <strong>Location:</strong> {camp.location}
                    </p>
                    <p>
                      <strong>Professional:</strong> {camp.professional}
                    </p>
                    <p>
                      <strong>Participants:</strong> {camp.participants}
                    </p>
                  </div>
                }
              />
              <Link to={`/camp-details/${camp.id}`}>
                <Button
                  type="primary"
                  className="bg-blue-600 hover:bg-blue-700 mt-4 border-none w-full"
                >
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* See All Camps Button */}
        <div className="mt-10 text-center">
          <Link to="/available-camps-page">
            <button className="px-6 py-3 rounded-lg font-semibold text-lg btn btn-primary">
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCamps;
