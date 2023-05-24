import React, { Component } from "react";
const AdditionalParsingParams = (props) => {
	const { options, selectOption } = props;
	return (
		<React.Fragment>
			{options.map((option) => {
				return (
					<fieldset key={option.id}>
						<div>
							<input
								type="checkbox"
								id={option.id}
								name="options"
								onClick={() => selectOption(option.id)}
							></input>
							<label htmlFor={option.id}>{option.name}</label>
						</div>
					</fieldset>
				);
			})}
		</React.Fragment>
	);
};

export default AdditionalParsingParams;
