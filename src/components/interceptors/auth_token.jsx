import axios from "axios";

export const Axios = axios.create();

Axios.interceptors.request.use(async (config) => {
	config.headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	};
	return config;
});

export default Axios;
