import React, { Component } from "react";

const DatafileCard = (datafile, navigate, owner = false) => {
	const goToDatafile = (id) => {
		navigate(`/datafileAttrs/${id}`);
	};

	const normaliseDate = (datafile_date) => {
		const date = new Date(datafile_date);
		const day = date.getDate();
		const month = date.getMonth() + 1; //Months are zero based
		const year = date.getFullYear();
		return day + "-" + month + "-" + year;
	};

	return (
		<div key={datafile.id} className="card">
			<h5 className="card-header">Наименование файла: {datafile.file_name}</h5>
			<div className="card-body">
				<h6 className="card-title">
					Создан: {normaliseDate(datafile.file_created_at)}
				</h6>
				Комментарий: <p className="card-text">{datafile.comment}</p>
				{owner && (
					<a
						href="#"
						className="btn btn-light"
						onClick={() => goToDatafile(datafile.id)}
					>
						Редактировать
					</a>
				)}
			</div>
		</div>
	);
};

export default DatafileCard;
