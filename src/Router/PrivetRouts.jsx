import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

const PrivetRouts = ({children}) => {
    const {user, loder} = useContext(AuthContext);

    const location = useLocation();

    if(loder){
        return <LoadingPage></LoadingPage>
    }
    if(user){
        return children;
    }
    return <Navigate to='/join-us' state={{from: location}} replace></Navigate>
};

export default PrivetRouts;