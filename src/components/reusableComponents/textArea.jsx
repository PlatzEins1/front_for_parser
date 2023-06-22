import React from "react";

const TextArea = (props) => {
	const { name, label, error, onChange, type, value, style } = props;
	//console.log(props);
	return (
		<div className="form-group" style={{ textAlign: "center" }}>
			<label htmlFor={name} style={{ marginBottom: "1em" }}>
				{label}
			</label>
			<textarea
				style={{
					width: "20em",
					marginBottom: "2em",
					textAlign: "center",
					margin: "auto",
				}}
				onChange={onChange}
				type={type}
				value={value}
				name={name}
				id={name}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default TextArea;
