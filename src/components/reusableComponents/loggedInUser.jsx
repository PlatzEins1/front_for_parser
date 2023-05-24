import React from "react";
import { useNavigate } from "react-router-dom";

const LoggedInUser = (props) => {
	const { username } = props;
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<div
				className="collapse navbar-collapse d-flex justify-content-end"
				id="navbarSupportedContent"
			>
				<ul className="nav navbar-nav">
					<li className="nav-item pull-right">
						<div id="user_info">
							Пользователь: {username}.{" "}
							<a
								onClick={() => {
									localStorage.clear();

									//navigate("/main");
									window.location.reload(false);
								}}
							>
								выйти.
							</a>
						</div>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
};

export default LoggedInUser;
