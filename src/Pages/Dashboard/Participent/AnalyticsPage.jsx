import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Spin, Card } from "antd";
import { AuthContext } from "../../../Provider/AuthProvider";

const AnalyticsPage = () => {

  const {user} = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [campData, setCampData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Function to fetch participant's registered camps dynamically
  const fetchCampData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/participants/email/${user?.email}`); 
      if (!response.ok) throw new Error("Failed to fetch camp data");

      const data = await response.json();
      setCampData(data); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCampData();
      setLoading(false);
    }, 2000); 
  }, []);
  

  return (
    <div className="bg-slate-100 p-8 min-h-screen">
      <h1 className="mb-7 font-bold text-[#1A8A83] text-4xl text-center">Your Camp Analytics</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="bg-white bg-opacity-80 p-5 rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl text-center">Registered Camps Fees Overview</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={campData} margin={{ top: 200, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="campFees" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsPage;
