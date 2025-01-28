import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Spin, Card } from "antd";

const AnalyticsPage = () => {
  const [campData, setCampData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Fetch API Data for Registered Camps
    setTimeout(() => {
      setCampData([
        { campName: "Health Camp A", campFee: 200 },
        { campName: "Wellness Camp B", campFee: 150 },
        { campName: "Nutrition Camp C", campFee: 250 },
        { campName: "Fitness Camp D", campFee: 300 },
      ]);
      setLoading(false);
    }, 2000); // Mock loading delay
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-400 to-indigo-500 p-8 min-h-screen text-white">
      <h1 className="mb-5 font-bold text-3xl text-center">Your Camp Analytics</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="bg-white bg-opacity-80 p-5 rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl text-center">Registered Camps Fees Overview</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={campData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="campFee" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsPage;
