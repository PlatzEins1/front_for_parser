// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	// Add your own authentication on the below line.
	//const isLoggedIn = AuthService.isLoggedIn();

	const accessToken = localStorage.getItem("accessToken");

	const username = localStorage.getItem("username");

	return accessToken && username ? (
		<Outlet />
	) : (
		<Navigate to="/login"></Navigate>
	);
};

export default PrivateRoute;
