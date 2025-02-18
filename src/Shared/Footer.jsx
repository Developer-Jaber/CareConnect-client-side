import { Input, Button } from "antd";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-10">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
        {/* About Section */}
        <div>
          <h2 className="mb-3 font-bold text-xl">About Us</h2>
          <p className="text-sm">
            Join our medical camp management system and empower health awareness by connecting organizers and participants for impactful events.
          </p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="mb-3 font-bold text-xl">Newsletter</h2>
          <p className="mb-2 text-sm">Stay updated with the latest camps and healthcare events.</p>
          <Input.Search
            placeholder="Enter your email"
            enterButton={<Button type="primary">Subscribe</Button>}
            size="large"
            className="mt-3"
          />
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="mb-3 font-bold text-xl">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-indigo-300 cursor-pointer">Available Camps</li>
            <li className="hover:text-indigo-300 cursor-pointer">Join a Camp</li>
            <li className="hover:text-indigo-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-indigo-300 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="mb-3 font-bold text-xl">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <Button shape="circle" icon={<FaFacebook />} className="bg-blue-600 text-white" />
            <Button shape="circle" icon={<FaTwitter />} className="bg-blue-400 text-white" />
            <Button shape="circle" icon={<FaInstagram />} className="bg-pink-500 text-white" />
            <Button shape="circle" icon={<FaLinkedin />} className="bg-blue-700 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-white/30 border-t text-sm text-center">
        © 2025 Medical Camp Management System. All rights reserved. Built with ❤️ by Jaber Hossain.
      </div>
    </footer>
  );
};

export default Footer;
