import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";
import { useState, useEffect } from "react";
import { paginate } from "./reusableComponents/pagination";

const MyDataFilesF = (props) => {
	const { username } = props;
	const userDatafilesURL = config.userDatafiles;

	const [datafiles, setDatafiles] = useState([]);
	const [empty, setEmptyness] = useState(false);

	useEffect(async () => {
		const fetch = async () => {
			try {
				const responce = await axios.get(userDatafilesURL + username);
				const datafiles = responce.data;
				setDatafiles(datafiles);
			} catch (error) {
				//console.log(error.message, "message");
				if (error.message === "Request failed with status code 404") {
					setEmptyness(true);
				}
			}
		};
		fetch();
	});

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
};

export default MyDataFilesF;
