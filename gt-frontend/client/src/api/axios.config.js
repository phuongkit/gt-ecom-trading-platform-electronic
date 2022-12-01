import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../redux/user/userApi';
import { DEFAULT_STORE } from '../utils/constants';


const apiProduction = process.env.BACKEND_URL+ '/api/v1';
const apiDev = process.env.BACKEND_URL + '/api/v1';

const baseURL = import.meta.env.MODE === 'production' ? apiProduction : apiDev;

const axiosClient = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + '';
    return error;
};

// const navigate = useNavigate();

axiosClient.interceptors.request.use(
    function (req) {
        // const token = JSON.parse(localStorage.getItem('token'));
        const token = 'Bearer ' + JSON.parse(localStorage.getItem(DEFAULT_STORE.TOKEN));
        // if (token) req.headers['auth-token'] = token;
        if (token) req.headers['Authorization'] = token;
        return req;
    },

    function (error) {
        alert('Vui lòng đăng nhập lại');
        handleLogout();
        return Promise.reject(error);
    },
);
axiosClient.interceptors.response.use(
    function (res) {
        return res.data;
    },

    function (error) {
        const { response } = error;
        const { data } = error.response;
        if (response.status === 401) {
            alert("Vui lòng đăng nhập để thực hiện chức năng này");
            handleLogout();
        }
        // if (error.hasOwnProperty('code') && data.hasOwnProperty('message')) {
        //     return Promise.reject(createError(response.status, data['status'], data['message'], "error occurred"));
        // }
        return Promise.reject(error.response.data);
    },
);
export default axiosClient;
