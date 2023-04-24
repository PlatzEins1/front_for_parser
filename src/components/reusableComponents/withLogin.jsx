import LoginForm from "../loginForm";
import { Navigate } from "react-router-dom";
import withRouter from "./withRouter";

const WithLogin = (WrappedComponent) => (props) => {
	const navigateTo = WrappedComponent;
	let flag = false;

	localStorage.getItem("token") ? (flag = true) : (flag = false);
	return flag ? (
		<WrappedComponent {...props} />
	) : (
		<Navigate to="/login"></Navigate>
	);
};

export default WithLogin;
