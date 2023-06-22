import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import withRouter from "./withRouter";
import LoggedInUser from "./loggedInUser";

class Navbar extends Component {
	state = {
		navbarItems: [
			{ name: "Главная", url: "/main" },
			{ name: "Мои файлы с данными", url: "/myfiles" },
			{ name: "Общедоступные файлы с даными", url: "/commonfiles" },
			{ name: "Рабочее место", url: "/workplace " },
		],
	};

	render() {
		const { navbarItems } = this.state;
		const { username } = this.props;
		return (
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						Главная
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{navbarItems.map((navitem) => (
								<li className="nav-item" key={navitem.name}>
									<NavLink className="nav-item nav-link" to={navitem.url}>
										{navitem.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<LoggedInUser username={username}></LoggedInUser>
				</div>
			</nav>
		);
	}
}

export default withRouter(Navbar);
