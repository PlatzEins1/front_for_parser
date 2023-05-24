import LoginForm from "../loginForm";
import { Navigate } from "react-router-dom";
import withRouter from "./withRouter";

const WithLogin = (WrappedComponent) => (props) => {
	const navigateTo = WrappedComponent;
	const flag = localStorage.getItem("username");
	console.log(flag, "flag");

	//localStorage.getItem("accessToken") ? (flag = true) : (flag = false);
	//localStorage.getItem("username") ? (flag = true) : (flag = false);

	if (flag) {
		return <WrappedComponent {...props} />;
	} else {
		<Navigate to="/login"></Navigate>;
	}

	//return flag ? (
	//	<WrappedComponent {...props} />
	//) : (
	//	<Navigate to="/login"></Navigate>
	//);
};

export default WithLogin;
