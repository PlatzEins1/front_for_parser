import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";

class MyDataFiles extends Component {
	state = { datafiles: [] };

	async componentDidMount() {
		const { username } = this.props;
		const userDatafilesURL = config.userDatafiles;
		const responce = await axios.get(userDatafilesURL + username);
		console.log(responce);
		console.log(responce.data);
		const datafiles = responce.data;
		this.setState({ datafiles });
	}

	render() {
		const { datafiles } = this.state;
		console.log(datafiles);
		return (
			<React.Fragment>
				<div className="d-flex align-items-center justify-content-center container-fluid">
					<div className="col-md-6">
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
										<a href="#" className="btn btn-primary">
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
}

export default MyDataFiles;
