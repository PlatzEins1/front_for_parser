import Joi from "joi-browser";
import React, { Component } from "react";
import Form from "./reusableComponents/form";
import withRouter from "./reusableComponents/withRouter";
import axios from "axios";
import config from "../config.json";
import { setAuthToken } from "./reusableComponents/setAuthToken";
import { Navigate } from "react-router-dom";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().min(5).label("Password"),
	};

	doSubmit = async () => {
		const { navigate } = this.props;

		const username = this.state.data.username;
		const password = this.state.data.password;

		const { jwtUrl } = config;

		console.log(navigateTo);

		const navigateTo = this.props.navigateTo;

		const loginPayload = {
			username: username,
			password: password,
		};

		const { data } = await axios.post(jwtUrl, loginPayload);

		const { access, refresh } = data;

		localStorage.setItem("accessToken", access);
		localStorage.setItem("refreshToken", refresh);

		this.props.setLogin(username);
		setAuthToken(access);
		//navigate("/main");
		navigate(navigateTo);
	};

	render() {
		return (
			<React.Fragment>
				<div
					style={{
						width: "50%",

						textAlign: "center",
						margin: 0,
						position: "absolute",
						top: "40%",
						left: "50%",

						transform: "translate(-50%, -50%)",
					}}
				>
					<h1>Вход</h1>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "Логин")}
						{this.renderInput("password", "Пароль", "password")}
						{this.renderButton("Войти")}
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(LoginForm);
