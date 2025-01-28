import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://b10a12-server-side-developer-jaber.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;