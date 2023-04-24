// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	// Add your own authentication on the below line.
	//const isLoggedIn = AuthService.isLoggedIn();

	let flag = false;
	localStorage.getItem("token") ? (flag = true) : (flag = false);

	return flag ? <Outlet /> : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
