import { Navigate } from "react-router-dom";
//import config from ".../config";
import axios from "axios";

export async function refreshAccessToken(refreshToken, refreshUrl) {
	//const refreshUrl = jwtUrl + "refresh";
	const payload = { refresh: refreshToken };
	const responce = await axios.post(refreshUrl, payload);
	console.log(responce);
}

export const setAuthToken = (token, username) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		//axios.defaults.headers.common["username"] = `${username}`;
	} else delete axios.defaults.headers.common["Authorization"];
};

async function Auth() {
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		return accessToken;
	}
}
export default Auth;
