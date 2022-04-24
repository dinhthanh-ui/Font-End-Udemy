import axios from 'axios';
import { toast } from 'react-toastify';


// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: 'http://localhost:8080'
});
instance.defaults.withCredentials = true;
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

// ===============================

// Add a request interceptor
instance.interceptors.request.use(function (config)
{
	// Do something before request is sent
	return config;
}, function (error)
{
	// Do something with request error
	return Promise.reject(error);
});

// =================================================================
instance.interceptors.response.use(function (response)
{
	if (response.data && +response.data.errorCode !== 0)
	{
		toast.error(response.data)
	}
	return response.data;
}, function (error)
{
	toast.error("xảy ra lỗi máy chủ nội bộ")
	return Promise.reject(error);
});


export default instance