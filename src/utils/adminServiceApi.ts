import axios from 'axios';
import { getAuthToken, isLoggedIn, logout } from './AuthUtils';

const adminServiceApi = () => {
	let headers = {};
	if (isLoggedIn()) {
		headers = {
			Authorization: `Bearer ${getAuthToken()}`,
		};
	}
	const axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_ADMIN_BASE_URL || '',
		timeout: 30000,
		headers,
	});

	const afterLogout = () => window.location.replace('/');

	if (window.location.pathname !== '/') {
		axiosInstance.interceptors.response.use(
			(response: any) => {
				return response;
			},
			(error: any) => {
				if (error.response.status === 401) {
					logout(afterLogout);
				}
				return error;
			}
		);
	}

	return axiosInstance;
};

export default adminServiceApi;
