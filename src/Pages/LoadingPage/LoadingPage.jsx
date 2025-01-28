import { Button, Spin } from "antd";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-700 min-h-screen text-white">
      Loader Section
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Spin size="large" className="mb-5 text-white" />
        <h1 className="font-bold text-4xl tracking-wide">
          Loading<span className="text-indigo-200">...</span>
        </h1>
        <p className="mt-2 text-lg">Please wait while we prepare your experience</p>
      </motion.div>

      {/* Fun Button Animation */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Button className="shadow-xl btn btn-primary btn-wide">
          Refresh If It’s Taking Too Long
        </Button>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
