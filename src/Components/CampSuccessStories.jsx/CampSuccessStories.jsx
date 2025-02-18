import { Card, Rate, Divider } from "antd";
import { motion } from "framer-motion";

const CampSuccessStories = () => {
  // Mock Success Stories Data (Replace with API Data)
  const successStories = [
    {
      id: 1,
      participant: "John Doe",
      campName: "Heart Health Camp",
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?fit=crop&w=400&q=80",
      rating: 5,
      story:
        "The Heart Health Camp was life-changing! The healthcare professionals provided excellent advice that significantly improved my lifestyle.",
    },
    {
      id: 2,
      participant: "Jane Smith",
      campName: "Wellness Retreat",
      image:
        "https://images.unsplash.com/photo-1518128956681-613b2d09877c?fit=crop&w=400&q=80",
      rating: 4,
      story:
        "I learned so much about mental wellness at this camp. The sessions were insightful, and I made great friends.",
    },
  ];

  return (
    <div className="mt-24 min-h-screen">
      <h1 className="mb-10 font-bold text-[#1A8A83] text-4xl text-center">
        Camp Success Stories
      </h1>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {successStories.map((story) => (
          <motion.div
            key={story.id}
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={story.campName}
                  src={story.image}
                  className="rounded-t-lg"
                />
              }
              className="shadow-xl w-full max-w-md"
            >
              <h2 className="font-semibold text-blue-800 text-2xl">
                {story.campName}
              </h2>
              <p className="text-gray-600">Participant: {story.participant}</p>
              <Rate disabled defaultValue={story.rating} className="mt-2" />
              <Divider />
              <p className="text-gray-700">{story.story}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CampSuccessStories;
