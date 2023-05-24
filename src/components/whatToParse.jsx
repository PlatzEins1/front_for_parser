import React, { Component } from "react";
import DependentForm from "./reusableComponents/dependentForm";
import Joi from "joi";
import Input from "./reusableComponents/input";

const WhatToParse = (props) => {
	const { options, selectWhatToParse } = props;
	//console.log(options);
	return (
		<React.Fragment>
			<fieldset id="sourceTypes">
				{options.map((option) => {
					return (
						<div key={option.id}>
							<input
								onClick={() => {
									selectWhatToParse(option.id);
								}}
								type="radio"
								id={option.id}
								name="sourceTypes"
								value={option.name}
							></input>
							<label htmlFor={option.id}>{option.name}</label>
						</div>
					);
				})}
			</fieldset>
		</React.Fragment>
	);
};

export default WhatToParse;
