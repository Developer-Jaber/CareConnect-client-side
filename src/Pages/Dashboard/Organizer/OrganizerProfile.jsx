import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const OrganizerProfile = () => {
    const {user} = useContext(AuthContext);
  
    return (
      <div className="bg-white shadow-md p-5 rounded-lg">
        <h2 className="mb-3 font-bold text-xl">Organizer Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    );
  };
  
  export default OrganizerProfile;
  