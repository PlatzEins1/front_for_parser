import React, { Component, useReducer } from "react";
import WithLogin from "./reusableComponents/withLogin";
import { Navigate } from "react-router-dom";

class Main extends Component {
	state = {
		soicalNetworks: [{ name: "Вконтакте" }],
	};
	componentDidMount() {}
	render() {
		const { username } = this.props;
		if (!username) {
			return <Navigate to={"/login"}></Navigate>;
		}
		return <React.Fragment>Main</React.Fragment>;
	}
}

export default WithLogin(Main);
