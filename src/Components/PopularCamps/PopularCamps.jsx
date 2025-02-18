import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import "./PopularCamps.css"; 

const { Meta } = Card;

const PopularCamps = () => {
    const [camps,setCamps] = useState([]);

    useEffect(()=>{
        fetch('https://b10a12-server-side-developer-jaber.vercel.app/madical_camp')
        .then(res=>res.json())
        .then(data=>setCamps(data))
    },[])

  // Limit to a maximum of six camps sorted by participant count
  const popularCamps = camps
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6);

  return (
    <div className="mx-auto py-12 popular-camps-section w-11/12">
      <div className="mx-auto px-4 container">
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="font-bold text-[#1A8A83] text-3xl">Popular Medical Camps</h2>
          <p className="mt-2 font-semibold text-gray-600">Discover our top-rated medical camps with the highest participation!</p>
        </div>

        {/* Camp Cards */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {popularCamps.map((camp) => (
            <Card
              key={camp._id}
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
                title={<h3 className="my-3 font-bold text-blue-800 text-xl">{camp.name}</h3>}
                description={
                  <div className="mt-2 text-sm">
                    <p className="font-bold">
                      <span className="text-black text-lg">Date & Time: </span> {camp.dateTime}
                    </p>
                    <p className="font-bold">
                      <span className="text-black text-lg">Location: </span> {camp.location}
                    </p>
                    <p className="font-bold">
                      <span className="text-black text-lg">Professional: </span> {camp.professional}
                    </p>
                    <p className="font-bold">
                      <span className="text-black text-lg">Participants: </span> {camp.participants}
                    </p>
                  </div>
                }
              />
              <Link to={`/camp-details/${camp._id}`}>
                <button
                  className="bg-[#42bb76] hover:bg-[#b8c7bf] mt-6 border-none w-full font-bold text-gray-200 hover:text-gray-600 btn"
                >
                  View Details
                </button>
              </Link>
            </Card>
          ))}
        </div>

        {/* See All Camps Button */}
        <div className="mt-10 text-center">
          <Link to="/available-camps-page">
            <button className="bg-[#42bb76] hover:bg-[#b8c7bf] mt-10 px-6 py-2 rounded-lg font-semibold text-gray-200 hover:text-gray-600 text-xl btn">
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCamps;
