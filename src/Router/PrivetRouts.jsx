import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

const PrivetRouts = ({children}) => {
    const {user, loder} = useContext(AuthContext);
    if(loder){
        return <LoadingPage></LoadingPage>
    }
    if(user){
        return children;
    }
    return <Navigate to='/join-us'></Navigate>
};

export default PrivetRouts;