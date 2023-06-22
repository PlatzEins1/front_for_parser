import React, { Component } from "react";

const CheckBox = (props) => {
	const { name, label, onchange, value } = props;

	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="checkbox"
				value=""
				id={name}
				onClick={onchange}
			/>
			<label className="form-check-label" htmlFor={name}>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
