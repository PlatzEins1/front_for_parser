import React, { Component } from "react";
const VerticalButtonGroup = (props) => {
	const { content } = props;
	return (
		<React.Fragment>
			<div className="btn-group-vertical">
				{content.map((button) => {
					return (
						<button type="button" className="btn btn-link">
							{button.name}
						</button>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default VerticalButtonGroup;

const example = (
	<button type="button" className="btn btn-secondary">
		Right
	</button>
);
