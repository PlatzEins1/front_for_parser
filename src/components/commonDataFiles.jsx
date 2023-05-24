import React, { Component } from "react";
import MyDataFiles from "./myDataFiles";
import axios from "axios";
//import { Axios } from "./interceptors/auth_token";

import config from "../config.json";

class CommonDataFiles extends Component {
	state = {
		datafiles: [],
		empty: false,
	};
	render() {
		const { datafiles } = this.state;

		return (
			<React.Fragment>
				<div className="d-flex align-items-center justify-content-center container-fluid">
					<div className="col-md-6">
						{!datafiles && (
							<div className="card">
								<div className="card-body">Нет общедоступных датафайлов</div>
							</div>
						)}

						{datafiles.map((datafile) => {
							return (
								<div key={datafile.id} className="card">
									<h5 className="card-header">
										Создан: {datafile.file_created_at}
									</h5>
									<div className="card-body">
										<h5 className="card-title">
											Наименование файла: {datafile.file_name}
										</h5>
										Комментарий: <p className="card-text">{datafile.comment}</p>
										<a href="#" className="btn btn-light">
											Go somewhere
										</a>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</React.Fragment>
		);
	}
	async componentDidMount() {
		const commonDatafilesURL = config.commonDatafiles;

		const accessToken = localStorage.getItem("accessToken");

		axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

		try {
			const responce = await axios.get(commonDatafilesURL);
			//console.log(responce);
			//console.log(responce.data);
			const datafiles = responce.data;
			const empty = false;
			this.setState({ datafiles, empty });
		} catch (error) {
			//console.log(error.message, "message");
			if (error.message === "Request failed with status code 404") {
				const empty = true;
				this.setState({ empty });
			}
		}
	}
}

export default CommonDataFiles;
