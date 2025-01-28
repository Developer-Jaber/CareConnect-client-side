import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const OrganizerProfile = () => {
  
    const {user} = useContext(AuthContext);
  
    return (
      <div className="bg-white shadow-md p-5 rounded-lg">
        <h2 className="mb-3 font-bold text-xl">Organizer Profile</h2>
        <img className="w-24" src={user.photoURL} alt="" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    );
  };
  
  export default OrganizerProfile;
  