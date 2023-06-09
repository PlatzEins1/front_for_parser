import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textArea";
import CheckBox from "./checkBox";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button
				disabled={this.validate()}
				style={{ marginTop: "1em" }}
				className="btn btn-light"
			>
				{label}
			</button>
		);
	}

	renderoptionalButton(label) {
		return (
			<button style={{ marginTop: "1em" }} className="btn btn-light">
				{label}
			</button>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;

		return (
			<Select
				name={name}
				value={data[name]}
				label={label}
				options={options}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderInput(name, label, type = "text") {
		//console.log(this.state);
		const { data, errors } = this.state;

		//console.log(data);

		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors ? errors[name] : ""}
			/>
		);
	}

	renderTextArea(name, label, type = "text") {
		//console.log(this.state);
		const { data, errors } = this.state;

		//console.log(data);

		return (
			<TextArea
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors ? errors[name] : ""}
			/>
		);
	}

	renderCheckBox(name, label, onchange = null) {
		const { data } = this.state;
		const value = data[name];

		return (
			<CheckBox
				name={name}
				label={label}
				value={value}
				onchange={onchange}
			></CheckBox>
		);
	}
}

export default Form;
