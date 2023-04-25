import React, { Component } from "react";
import { Route, Redirect, Routes, Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/reusableComponents/navbar";
import Main from "./components/main";
import MyDataFiles from "./components/myDataFiles";
import CommonDataFiles from "./components/commonDataFiles";
import Workplace from "./components/workplace";
import LoginForm from "./components/loginForm";
import RouteGuard from "./components/reusableComponents/routeGuard";
import PrivateRoute from "./components/reusableComponents/privateRoute";
import config from "./config.json";

class App extends Component {
	state = { username: "" };

	setLogin = (username) => {
		this.setState({ username });
	};

	render() {
		const username = this.state.username;

		return (
			<React.Fragment>
				{username ? <Navbar username={username} /> : ""}

				<main className="container">
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path="/main" element={<Main username={username} />} />
							<Route
								path="/myfiles"
								element={<MyDataFiles username={username} />}
							/>
							<Route path="/commonfiles" Component={CommonDataFiles} />
							<Route path="/workplace" Component={Workplace} />
						</Route>
						<Route
							path="/login"
							element={<LoginForm setLogin={this.setLogin} />}
						/>
						<Route path="*" element={<Navigate to="/main" />} />
					</Routes>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
