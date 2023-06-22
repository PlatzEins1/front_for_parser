import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";
import withRouter from "./reusableComponents/withRouter";
import DatafileCard from "./reusableComponents/datafileCard";
import { paginate } from "./reusableComponents/pagination";

class MyDataFiles extends Component {
	state = {
		datafiles: [],
		empty: false,
		pageNumber: 1,
		pageSize: 5,
		totalCount: 0,
		pagedData: [],
	};

	async componentDidMount() {
		const { username } = this.props;
		const userDatafilesURL = config.userDatafiles;

		try {
			const responce = await axios.get(userDatafilesURL + username);

			const datafiles = responce.data;

			const empty = false;
			this.setState({ datafiles, empty });
			const { totalCount, paginatedData } = this.getPaginatedData();
			this.setState({ totalCount, paginatedData });
		} catch (error) {
			//console.log(error.message, "message");
			if (error.message === "Request failed with status code 404") {
				const empty = true;
				this.setState({ empty });
			}
		}
	}

	getPaginatedData() {
		const { datafiles, pageNumber, pageSize, empty } = this.state;

		if (!empty) {
			const paginatedData = paginate(datafiles, pageNumber, pageSize);

			return { totalCount: datafiles.length, data: paginatedData };
		}
	}

	render() {
		const { datafiles } = this.state;

		return (
			<React.Fragment>
				<div className="d-flex align-items-center justify-content-center container-fluid">
					<div className="col-md-6">
						{!datafiles && (
							<div className="card">
								<div className="card-body">Вы пока не добавили данные</div>
							</div>
						)}

						{datafiles.map((datafile) => {
							return DatafileCard(datafile, this.props.navigate, true);
						})}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(MyDataFiles);
