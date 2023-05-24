import React, { Component } from "react";
import DependentForm from "./reusableComponents/dependentForm";
import Joi from "joi";
import Input from "./reusableComponents/input";
import { read } from "joi-browser";

class DataSource extends Component {
	handleFileInput = async (event) => {
		event.preventDefault();

		const file = event.currentTarget.files[0];

		const reader = new FileReader();

		reader.readAsText(file);
		reader.onload = () => {
			console.log(reader.result);
		};
	};

	render() {
		const { handleURLInput, handleFileInput, sources } = this.props;
		return (
			<React.Fragment>
				<div className="col-md-6">
					<div>
						<div className="form-group" style={{ textAlign: "center" }}>
							<Input
								name={"groupUrl"}
								label={"Введите ссылку на объект"}
								value={sources}
								onChange={handleURLInput}
							></Input>

							<br />
							<br />

							<div className="form-group">
								<div>
									<label htmlFor="cheese" style={{ marginBottom: "1em" }}>
										Введите файл, содержащий список ссылок
									</label>
								</div>
								<div>
									<input
										onChange={handleFileInput}
										type="file"
										name="cheese"
										id="cheese"
									></input>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DataSource;
