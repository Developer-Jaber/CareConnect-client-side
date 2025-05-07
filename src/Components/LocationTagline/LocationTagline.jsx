import { useState, useEffect } from 'react';
import { Tag, Select, Button, Tooltip } from 'antd';
import { EnvironmentOutlined, GlobalOutlined, RadarChartOutlined } from '@ant-design/icons';

const LocationTagline = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sample regions data (replace with your actual service areas)
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'urban', label: 'Urban Areas' },
    { value: 'rural', label: 'Rural Areas' },
    { value: 'dhaka', label: 'Dhaka Division' },
    { value: 'chittagong', label: 'Chittagong Division' },
    // Add more specific cities/districts
  ];

  // Detect user's approximate location
  const detectLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            type: 'coordinates'
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Location detection failed:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  // Get location-based tagline
  const getTagline = () => {
    switch(selectedRegion) {
      case 'urban':
        return "Transforming Urban Healthcare Access";
      case 'rural':
        return "Bridging Rural Health Disparities";
      case 'dhaka':
        return "Serving Dhaka's Communities";
      case 'chittagong':
        return "Strengthening Chittagong's Health Infrastructure";
      default:
        return "Empowering Health Access Nationwide";
    }
  };

  return (
    <div className="bg-[var(--background)] px-6 md:px-12 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <Tag icon={<GlobalOutlined />} className="bg-[var(--primary)] mb-4 text-white text-sm">
          SERVICE COVERAGE
        </Tag>
        
        <h2 className="mb-6 font-bold text-[var(--text)] text-2xl md:text-3xl">
          {getTagline()}
        </h2>
        
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 mb-8">
          <Select
            value={selectedRegion}
            onChange={setSelectedRegion}
            options={regions}
            className="min-w-[200px]"
            suffixIcon={<EnvironmentOutlined />}
          />
          
          <Tooltip title="Detect my location">
            <Button 
              icon={<RadarChartOutlined />} 
              loading={isLoading}
              onClick={detectLocation}
              className="bg-[var(--secondary)]"
            >
              Auto-Detect
            </Button>
          </Tooltip>
        </div>
        
        {/* Dynamic stats based on region */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Tag className="bg-white border-[var(--primary)]">
            🏥 {selectedRegion === 'rural' ? '128+' : '320+'} Camps Organized
          </Tag>
          <Tag className="bg-white border-[var(--primary)]">
            👩‍⚕️ {selectedRegion === 'rural' ? '85+' : '210+'} Professionals
          </Tag>
          <Tag className="bg-white border-[var(--primary)]">
            🙌 {selectedRegion === 'rural' ? '12K+' : '45K+'} Patients Served
          </Tag>
        </div>
      </div>
    </div>
  );
};


export  default LocationTagline;