import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRouts = ({children}) => {
    const {user} = useContext(AuthContext);
    
    if(user){
        return children;
    }
    return <Navigate to='/join-us'></Navigate>
};

export default PrivetRouts;