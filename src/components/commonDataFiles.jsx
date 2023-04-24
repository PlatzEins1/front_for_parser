import React, { Component } from "react";
import MyDataFiles from "./myDataFiles";
import axios from "axios";
import apiurl from "../config.json";

class CommonDataFiles extends Component {
	state = {
		datafiles: [],
	};
	render() {
		return <React.Fragment>CommonDataFiles</React.Fragment>;
	}
	async componentDidMount() {
		const datafiles = await axios.get(
			"http://127.0.0.1:8000/main/datafile_list/"
		);
		console.log(datafiles);
	}
}

export default CommonDataFiles;
