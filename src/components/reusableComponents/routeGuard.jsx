import React from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => {
	function hasJWT() {
		const flag = false;

		//check user has JWT token
		localStorage.getItem("token") ? (flag = true) : (flag = false);

		return flag;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				hasJWT() ? (
					<Component {...props} />
				) : (
					<useNavigate to={{ pathname: "/login" }} />
				)
			}
		/>
	);
};

export default RouteGuard;
