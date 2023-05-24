import React, { Component } from "react";
import Form from "./form";

class DependentForm extends Form {
	componentDidMount() {
		const { doSubmit } = this.props;
		this.doSubmit = doSubmit;
	}
}

export default DependentForm;
