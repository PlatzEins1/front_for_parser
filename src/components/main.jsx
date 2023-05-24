import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
	const [socialNetworks] = useState([
		{
			name: "Вконтакте",
			link: "/parseVK",
		},
	]);
	const navigate = useNavigate();
	return (
		<React.Fragment>
			{socialNetworks.map((socialNetwork) => {
				return (
					<button
						key={socialNetwork.name}
						className="btn btn-light"
						onClick={() => {
							navigate(socialNetwork.link);
						}}
					>
						{socialNetwork.name}
					</button>
				);
			})}
		</React.Fragment>
	);
};

export default Main;
